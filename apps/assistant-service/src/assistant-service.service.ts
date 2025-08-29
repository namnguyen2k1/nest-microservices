import { Injectable } from '@nestjs/common';

@Injectable()
export class AssistantServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
