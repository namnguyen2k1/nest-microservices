import { Body, Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ROLE_PATTERN } from "@shared/constants";
import { CreateRoleBodyDTO, GetRolesBodyDTO, UpdateRoleBodyDTO } from "@shared/dto/role";
import { PERMISSION_KEY } from "@shared/types";
import { RoleService } from "./role.service";

@Controller("")
export class RoleMessageController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern(ROLE_PATTERN.INITIAL_DATABASE)
  async initialDatabase() {
    return await this.roleService.checkAndInitialDatabase();
  }

  @MessagePattern(ROLE_PATTERN.GET_LIST_ROLES)
  async list(@Body() body: GetRolesBodyDTO) {
    return await this.roleService.findAllRoles(body);
  }

  @MessagePattern(ROLE_PATTERN.GET_ROLE_BY_ID)
  async findById(roleId: string) {
    return await this.roleService.findById(roleId);
  }

  @MessagePattern(ROLE_PATTERN.CREATE_ROLE)
  async createRole(body: CreateRoleBodyDTO) {
    const role = await this.roleService.create(body);
    return {
      _status: 201,
      _message: "Create role successfully",
      data: role,
    };
  }

  @MessagePattern(ROLE_PATTERN.UPDATE_ROLE)
  async updateRole(body: UpdateRoleBodyDTO, roleId: string) {
    const role = await this.roleService.updateOne({
      data: body,
      roleId: roleId,
    });

    return {
      _message: "Update role successfully",
      data: role,
    };
  }

  @MessagePattern(ROLE_PATTERN.DELETE_ROLE)
  async removeRole(roleId: string) {
    await this.roleService.removeOne(roleId);
    return {
      _message: "Remove role successfully",
    };
  }

  @MessagePattern(ROLE_PATTERN.GET_ROLE_BY_ID)
  async getRoleById(roleId: string) {
    return await this.roleService.findById(roleId);
  }

  @MessagePattern(ROLE_PATTERN.GET_PERMISSION_BY_KEY)
  async getPermissionByKey(key: PERMISSION_KEY) {
    return await this.roleService.findPermissionByKey(key);
  }
}
