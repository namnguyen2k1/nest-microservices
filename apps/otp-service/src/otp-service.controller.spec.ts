import { Test, TestingModule } from '@nestjs/testing';
import { OtpServiceController } from './otp-service.controller';
import { OtpServiceService } from './otp-service.service';

describe('OtpServiceController', () => {
  let otpServiceController: OtpServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OtpServiceController],
      providers: [OtpServiceService],
    }).compile();

    otpServiceController = app.get<OtpServiceController>(OtpServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(otpServiceController.getHello()).toBe('Hello World!');
    });
  });
});
