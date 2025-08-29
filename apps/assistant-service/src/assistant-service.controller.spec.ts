import { Test, TestingModule } from "@nestjs/testing";
import { AssistantServiceController } from "./assistant-service.controller";
import { AssistantServiceService } from "./assistant-service.service";

describe("AssistantServiceController", () => {
  let assistantServiceController: AssistantServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AssistantServiceController],
      providers: [AssistantServiceService],
    }).compile();

    assistantServiceController = app.get<AssistantServiceController>(AssistantServiceController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(assistantServiceController.getHello()).toBe("Hello World!");
    });
  });
});
