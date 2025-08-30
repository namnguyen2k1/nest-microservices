import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ROLE_PATTERN, SERVICE_TOKEN } from "@shared/constants";
import {
  CreateRoleBodyDTO,
  GetRolesBodyDTO,
  GetRolesRes,
  UpdateRoleBodyDTO,
} from "@shared/dto/role";
import { lastValueFrom } from "rxjs";

// export interface RoleEvents {
//   GET_LIST_ROLES: {
//     data: GetRolesBodyDTO;
//     result: GetRolesRes;
//   };
//   GET_ROLE_BY_ID: {
//     data: string; // roleId
//     result: any | null;
//   };
//   CREATE_ROLE: {
//     data: CreateRoleBodyDTO;
//     result: any;
//   };
//   UPDATE_ROLE: {
//     data: { roleId: string; body: UpdateRoleBodyDTO };
//     result: any;
//   };
//   REMOVE_ROLE: {
//     data: string; // roleId
//     result: void;
//   };
// }

@Injectable()
export class RoleProxy {
  constructor(@Inject(SERVICE_TOKEN.ROLE) private readonly client: ClientProxy) {
    this.client.status.subscribe((status) => {
      console.log("[role-proxy] status:", status);
    });
  }

  async list(body: GetRolesBodyDTO) {
    return lastValueFrom(
      this.client.send<GetRolesRes, GetRolesBodyDTO>(ROLE_PATTERN.GET_LIST_ROLES, body),
    );
  }

  async findById(roleId: string) {
    return lastValueFrom(this.client.send(ROLE_PATTERN.GET_LIST_ROLES, roleId));
  }

  async createRole(body: CreateRoleBodyDTO) {
    return lastValueFrom(this.client.send(ROLE_PATTERN.GET_LIST_ROLES, body));
  }

  async updateRole(body: UpdateRoleBodyDTO, roleId: string) {
    return lastValueFrom(this.client.send(ROLE_PATTERN.GET_LIST_ROLES, { body, roleId }));
  }

  async removeRole(roleId: string) {
    return lastValueFrom(this.client.send(ROLE_PATTERN.GET_LIST_ROLES, roleId));
  }
}
