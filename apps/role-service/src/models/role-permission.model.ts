import { DB_COLLECTION } from "@database/mongodb/constant";
import { BaseModel } from "@database/mongodb/models/base.model";
import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { Prop, Schema } from "@nestjs/mongoose";
import { Permission, Role } from "@shared/types";
import { RolePermission } from "@shared/types/role-permission.types";
import { Types } from "mongoose";

@Schema(
  MongodbUtils.createSchemaOptions({
    collection: DB_COLLECTION.ROLE_PERMISSION,
  }),
)
export class RolePermissionModel extends BaseModel implements RolePermission {
  @Prop({
    type: Types.ObjectId,
    ref: DB_COLLECTION.ROLE,
    required: true,
  })
  roleId: Types.ObjectId | Role;

  @Prop({
    type: Types.ObjectId,
    ref: DB_COLLECTION.PERMISSION,
    required: true,
  })
  permissionId: Types.ObjectId | Permission;
}
