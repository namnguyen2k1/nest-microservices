import { Role } from "@shared/types";

export type GetRoleByIdResult = Role &
  {
    permissions: string[];
  }[];
