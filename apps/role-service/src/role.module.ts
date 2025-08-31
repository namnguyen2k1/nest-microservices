import { CachingModule } from "@cache/caching.module";
import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { MongodbModule } from "@database/mongodb/mongodb.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PermissionRepository } from "./repositories/permission.repository";
import { RolePermissionRepository } from "./repositories/role-permission.repository";
import { RoleRepository } from "./repositories/role.repository";
import { RoleMessageController } from "./role.message.controller";
import { RoleService } from "./role.service";
import { PermissionSchema } from "./schemas/permission.schema";
import { RolePermissionSchema } from "./schemas/role-permission.schema";
import { RoleSchema } from "./schemas/role.schema";

@Module({
  imports: [
    MongodbModule,
    CachingModule,
    MongooseModule.forFeature(
      [
        {
          name: DB_COLLECTION.ROLE,
          schema: RoleSchema,
        },
        {
          name: DB_COLLECTION.ROLE_PERMISSION,
          schema: RolePermissionSchema,
        },
        {
          name: DB_COLLECTION.PERMISSION,
          schema: PermissionSchema,
        },
      ],
      DB_CONNECTION.PLAYGROUND,
    ),
  ],
  controllers: [RoleMessageController],
  providers: [RoleRepository, RolePermissionRepository, PermissionRepository, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
