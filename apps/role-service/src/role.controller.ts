import { Controller, Get } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { ROLE_PATTERN } from "@shared/constants";
import { PERMISSION_KEY } from "@shared/types";
import { RoleService } from "./role.service";

@Controller("roles")
@ApiTags("roles")
// @ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get("initial-database")
  // @NoCache()
  // @PublicAPI()
  async initialDatabase() {
    // Only run the first time after starting the app
    await this.roleService.checkAndInitialDatabase();
    return {
      _message: "Check and initial database successfully",
    };
  }

  // @Post("get-list")
  // // @NoCache()
  // // @RequiredAccess({
  // //   roles: [ROLE_KEY.CLIENT],
  // //   permissions: [PERMISSION_KEY.ROLE_READ],
  // // })
  // async list(@Body() body: GetRolesBodyDTO) {
  //   const roles = await this.roleService.findAllRoles(body);
  //   return {
  //     _message: "Find all roles successfully",
  //     data: roles,
  //   };
  // }

  // @Get(":roleId")
  // async findById(@Param("roleId", MongoIdPipe) roleId: string) {
  //   const role = await this.roleService.findById(roleId);
  //   return {
  //     _message: "Find role successfully",
  //     data: role,
  //   };
  // }

  // @Post()
  // async createRole(@Body() body: CreateRoleBodyDTO) {
  //   const role = await this.roleService.create(body);
  //   return {
  //     _status: 201,
  //     _message: "Create role successfully",
  //     data: role,
  //   };
  // }

  // @Put(":roleId")
  // async updateRole(@Body() body: UpdateRoleBodyDTO, @Param("roleId", MongoIdPipe) roleId: string) {
  //   const role = await this.roleService.updateOne({
  //     data: body,
  //     roleId: roleId,
  //   });

  //   return {
  //     _message: "Update role successfully",
  //     data: role,
  //   };
  // }

  // @Delete(":roleId")
  // async removeRole(@Param("roleId", MongoIdPipe) roleId: string) {
  //   await this.roleService.removeOne(roleId);
  //   return {
  //     _message: "Remove role successfully",
  //   };
  // }

  @MessagePattern(ROLE_PATTERN.GET_ROLE_BY_ID)
  async getRoleById(roleId: string) {
    return await this.roleService.findById(roleId);
  }

  @MessagePattern(ROLE_PATTERN.GET_PERMISSION_BY_KEY)
  async getPermissionByKey(key: PERMISSION_KEY) {
    return await this.roleService.findPermissionByKey(key);
  }
}
