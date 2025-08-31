import { SERVICE } from "@shared/constants";
import { spawn } from "child_process";
import inquirer from "inquirer";
import { Command, CommandRunner, Option } from "nest-commander";

interface StartServiceOptions {
  service?: string;
  all?: boolean;
}

@Command({
  name: "start",
  description: "Start one or multiple NestJS microservices",
})
export class StartServiceCommand extends CommandRunner {
  async run(passedParams: string[], options?: StartServiceOptions): Promise<void> {
    if (options?.all) {
      this.runAllServices();
      return;
    }

    if (options?.service) {
      this.runService(options.service as SERVICE);
      return;
    }

    await this.promptAndRun();
  }

  @Option({
    flags: "-s, --service [service]",
    description: "Service name to start",
  })
  parseService(val: string): string {
    return val;
  }

  @Option({
    flags: "-a, --all",
    description: "Start all services",
  })
  parseAll(val: boolean): boolean {
    return val;
  }

  private startServices(services: string[]) {
    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      setTimeout(
        () => {
          console.log(`[cli] starting ${service}`);
          spawn("npx", ["nest", "start", service, "--watch"], {
            stdio: "inherit",
            shell: true,
          });
        },
        i * 1000 * 10,
      );
    }
  }

  private runService(service: SERVICE) {
    const { ROLE, OTP, NOTIFICATION, DEVICE, WALLET, USER, TOKEN, AUTH, API_GATEWAY } = SERVICE;
    const serviceMapper: Record<SERVICE, string[]> = {
      [ROLE]: [ROLE],
      [OTP]: [OTP],
      [NOTIFICATION]: [NOTIFICATION],
      [DEVICE]: [DEVICE],
      [WALLET]: [WALLET],
      [USER]: [ROLE, USER],
      [TOKEN]: [DEVICE, USER, TOKEN],
      [AUTH]: [USER, ROLE, DEVICE, OTP, TOKEN, NOTIFICATION],
      [API_GATEWAY]: [ROLE, API_GATEWAY],
    };
    const services = serviceMapper[service] || [service];

    this.startServices(services);
  }

  private runAllServices() {
    const services = Object.values(SERVICE);
    console.log("[cli] starting all services:", services.join(", "));

    this.startServices(services);
  }

  private async promptAndRun() {
    const services = Object.values(SERVICE);

    const { selectedService } = await inquirer.prompt([
      {
        type: "list", // "checkbox"
        name: "selectedService",
        message: "Select a service to start:",
        choices: services.map((s) => ({ name: s, value: s })),
        loop: false,
      },
    ]);

    if (!selectedService) {
      console.log("No service selected.");
      return;
    }

    console.log("[cli] starting selected service:", selectedService);
    this.runService(selectedService);
  }
}
