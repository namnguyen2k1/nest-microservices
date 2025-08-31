import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ROLE_PATTERN, SERVICE } from "@shared/constants";
import { PERMISSION_KEY, Role, User, USER_STATUS } from "@shared/types";
import { toObjectId, toStringSafe } from "@shared/utils";
import { FilterQuery } from "mongoose";
import { firstValueFrom, lastValueFrom } from "rxjs";
import { inspect } from "util";
import { GetAllUsersDTO } from "./dto/get-all-users.dto";
import { UpdateUserInfoDto } from "./dto/update-user-information.dto";
import { UpdateUserPermissionDto } from "./dto/update-user-permission.dto";
import { ProfileRepository } from "./repositories/profile.repository";
import { UserPermissionRepository } from "./repositories/user-permission.repository";
import { UserRepository } from "./repositories/user.repository";

@Injectable({})
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly profileRepo: ProfileRepository,
    private readonly userPermissionRepo: UserPermissionRepository,

    @Inject(SERVICE.ROLE) private readonly roleClient: ClientProxy,
  ) {
    this.roleClient.status.subscribe((status) => {
      console.log("[microservice] role-proxy status:", status);
    });
  }

  get userModel() {
    return this.userRepo.model;
  }

  /**
   * @param status: has default value USER_STATUS.ACTIVE
   */
  async findByEmail(email: string, status?: USER_STATUS[]) {
    return await this.userRepo.findOne({
      email,
      status: status?.length
        ? {
            $in: status,
          }
        : USER_STATUS.ACTIVE,
    });
  }

  async findById(userId: string) {
    return await this.userRepo.findOne({
      id: userId,
    });
  }

  async create(data: Partial<User>) {
    return await this.userRepo.create(data);
  }

  async update({ userId, data }: { userId: string; data: Partial<User> }) {
    return await this.userRepo.updateOne({ id: userId }, data);
  }

  async checkExisted(filter: FilterQuery<User>) {
    const record = await this.userRepo.findOne(filter);
    if (!record) {
      throw new NotFoundException(`User ${inspect(filter)}`);
    }
    return record;
  }

  async getAllUsers(paging: GetAllUsersDTO) {
    return await this.userRepo.findAllPaging(
      {},
      {
        projection: {},
        ...paging,
      },
    );
  }

  async getUserInfo(userId: string) {
    const user = await this.userRepo.findOne({
      id: userId,
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    const profile = await this.profileRepo.findOne({
      userId: userId,
    });
    const { permissions, ...role } = await lastValueFrom(
      this.roleClient.send<
        Role & {
          permissions: PERMISSION_KEY[];
        },
        string
      >(ROLE_PATTERN.GET_ROLE_BY_ID, toStringSafe(user.roleId)),
    );
    return {
      ...user,
      profile,
      permissions,
      role,
    };
  }

  async updateUserPermission(userId: string, dto: UpdateUserPermissionDto) {
    // 1. Check if the user exists
    const { permissions, roleKey } = dto;
    await this.checkExisted({ id: userId });

    // 2. Resolve permission IDs from the provided keys
    const listPermissions = await Promise.allSettled(
      permissions.map((key) => {
        return lastValueFrom(this.roleClient.send(ROLE_PATTERN.GET_PERMISSION_BY_KEY, key));
      }),
    );
    const permissionIds: string[] = listPermissions
      .filter((p) => p.status === "fulfilled")
      .map((p) => p.value?.id)
      .filter((id): id is string => id != null);

    // 3. Create or update UserPermission records for each permission ID
    await Promise.allSettled(
      permissionIds.map((permissionId) => {
        const data = {
          userId: toObjectId(userId),
          permissionId: toObjectId(permissionId),
        };
        return this.userPermissionRepo.createOrUpdateIfExisted(data, data);
      }),
    );

    // 4. Update the user's role if a roleKey is provided
    if (roleKey) {
      const roleId = await firstValueFrom(
        this.roleClient.send(ROLE_PATTERN.GET_ROLE_BY_ID, roleKey),
      );
      await this.update({
        userId,
        data: { roleId },
      });
    }
  }

  async updateUserInfo(userId: string, dto: UpdateUserInfoDto) {
    await this.checkExisted({ id: userId });
    return await this.userRepo.updateOne({ id: userId }, dto);
  }

  async removeUser(userId: string) {
    await this.checkExisted({ id: userId });
    return await this.userRepo.removeOne({ id: userId });
  }
}
