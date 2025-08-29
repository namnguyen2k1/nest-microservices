import { SetMetadata } from "@nestjs/common";
import { PERMISSION_KEY, ROLE_KEY } from "@shared/types";

export interface AccessData {
  readonly roles: ROLE_KEY[];
  readonly permissions: PERMISSION_KEY[];
}

export const REQUIRED_ACCESS = "REQUIRED_ACCESS";
export function RequiredAccess(data: AccessData) {
  return SetMetadata(REQUIRED_ACCESS, data);
}
