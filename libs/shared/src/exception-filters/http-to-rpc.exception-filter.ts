import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { throwError } from "rxjs";

@Catch(HttpException)
export class HttpToRpcExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const response = exception.getResponse() as any;

    const error = {
      __meta__: {
        // source: "",
        type: "rpc-exception",
      },
      statusCode: status,
      message: typeof response === "string" ? response : response.message,
      error: response?.error || exception.name,
    };

    console.log("[rpc-exception]", error);

    return throwError(() => {
      return new RpcException(error);
    });
  }
}
