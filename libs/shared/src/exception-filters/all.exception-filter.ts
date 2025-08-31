import { Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { Request, Response } from "express";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly adapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ExecutionContextHost): void {
    const request = host.getArgByIndex<Request>(0);
    const response = host.getArgByIndex<Response>(1);
    const hostType = host.getType();

    const { status, message, code, errors } = this.normalizeHttpException(exception, hostType);

    const body = {
      path: request.url,
      method: request.method,
      status,
      ...(message && { message }),
      ...(errors && { errors }),
      ...(code && { code }),
    };

    console.log("[exception]", body);
    this.adapterHost.httpAdapter.reply(response, body, status);
  }

  private normalizeHttpException(
    exception: any,
    hostType: string,
  ): {
    status: number;
    message?: string | null;
    code?: string | null;
    errors?: string[] | null;
  } {
    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | null = exception?.message ?? null;
    let code: string | null = null;
    let errors: string[] | null = null;

    if (hostType === "http") {
      // http exception
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const error = exception.getResponse() as any;

        if (typeof error === "string") {
          message = error;
        }
        // dto validation
        else if (Array.isArray(error?.message)) {
          errors = error?.message;
          code = "VALIDATION_ERROR";
        } else {
          message = error?.message ?? null;
          code = error?.code ?? null;
        }
      }
      // rpc exception
      else if (exception?.error?.__meta__?.type === "rpc-exception") {
        status = exception?.error?.statusCode;
        message = exception?.error?.message ?? exception?.message ?? "unknown error";
        code = exception?.error?.code ?? null;
        errors = exception?.error?.errors ?? null;
      }
    }

    return { status, message, code, errors };
  }
}
