import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenServiceService {
  getHello(): string {
    return "Hello World!";
  }
}
