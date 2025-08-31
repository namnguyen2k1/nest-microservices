import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ROLE_PATTERN, SERVICE } from "@shared/constants";
import {
  CreateRoleBody,
  CreateRoleBodyDTO,
  GetRolesBodyDTO,
  GetRolesResult,
  UpdateRoleBody,
  UpdateRoleBodyDTO,
} from "@shared/dto/role";
import { GetRoleByIdResult } from "@shared/dto/role/get-role-by-id.dto";
import { Role } from "@shared/types";
import { lastValueFrom } from "rxjs";

@Injectable()
export class RoleProxy {
  constructor(@Inject(SERVICE.ROLE) private readonly client: ClientProxy) {
    this.client.status.subscribe((status) => {
      console.log("[microservice] role-proxy status:", status);
    });
  }

  async initialDatabase() {
    const source = this.client.send<void, any>(ROLE_PATTERN.GET_LIST_ROLES, {});

    return await lastValueFrom(source).catch((error) => {
      throw error;
    });
  }

  async list(body: GetRolesBodyDTO) {
    const source = this.client.send<GetRolesResult, GetRolesBodyDTO>(
      ROLE_PATTERN.GET_LIST_ROLES,
      body,
    );

    return await lastValueFrom(source).catch((error) => {
      throw error;
    });
  }

  async findById(roleId: string) {
    const source = this.client.send<GetRoleByIdResult, string>(ROLE_PATTERN.GET_ROLE_BY_ID, roleId);

    return await lastValueFrom(source).catch((error) => {
      throw error;
    });
  }

  async createRole(body: CreateRoleBodyDTO) {
    const source = this.client.send<Role, CreateRoleBody>(ROLE_PATTERN.CREATE_ROLE, body);

    return await lastValueFrom(source).catch((error) => {
      console.log("[role-proxy] create error", error);
      throw error;
    });
  }

  async updateRole(body: UpdateRoleBodyDTO, roleId: string) {
    const source = this.client.send<Role, { body: UpdateRoleBody; roleId: string }>(
      ROLE_PATTERN.UPDATE_ROLE,
      { body, roleId },
    );

    return await lastValueFrom(source).catch((error) => {
      throw error;
    });
  }

  async removeRole(roleId: string) {
    const source = this.client.send<void, string>(ROLE_PATTERN.GET_LIST_ROLES, roleId);

    return await lastValueFrom(source).catch((error) => {
      throw error;
    });
  }
}
