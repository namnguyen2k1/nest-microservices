import authConfig from "@config/configs/auth.config";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { compare, hash } from "bcrypt";

@Injectable()
export class HashingService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly env: ConfigType<typeof authConfig>,
  ) {}

  async hash(data: string) {
    return await hash(data, this.env.jwt.saltOrRounds);
  }

  async compare(data: string, encrypted: string) {
    return await compare(data, encrypted);
  }
}
