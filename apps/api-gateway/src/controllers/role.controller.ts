import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateRoleBodyDTO, GetRolesBodyDTO, UpdateRoleBodyDTO } from "@shared/dto/role";
import { MongoIdPipe } from "@shared/pipes";
import { RoleProxy } from "@shared/proxy";

@Controller("roles")
@ApiTags("roles")
// @ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleProxy: RoleProxy) {}
  @Post("get-list")
  // @NoCache()
  // @RequiredAccess({
  //   roles: [ROLE_KEY.CLIENT],
  //   permissions: [PERMISSION_KEY.ROLE_READ],
  // })
  async list(@Body() body: GetRolesBodyDTO) {
    const roles = await this.roleProxy.list(body);
    return {
      _message: "Find all roles successfully",
      data: roles,
    };
  }

  @Post()
  async createRole(@Body() body: CreateRoleBodyDTO) {
    const role = await this.roleProxy.createRole(body);
    return {
      _status: 201,
      _message: "Create role successfully",
      data: role,
    };
  }

  @Put(":roleId")
  async updateRole(@Body() body: UpdateRoleBodyDTO, @Param("roleId", MongoIdPipe) roleId: string) {
    const role = await this.roleProxy.updateRole(body, roleId);

    return {
      _message: "Update role successfully",
      data: role,
    };
  }

  @Delete(":roleId")
  async removeRole(@Param("roleId", MongoIdPipe) roleId: string) {
    await this.roleProxy.removeRole(roleId);
    return {
      _message: "Remove role successfully",
    };
  }
}
