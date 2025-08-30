import { Paging, PagingDTO } from "@shared/dto";
import { Role } from "@shared/types";

export interface GetRolesBody extends Paging {}

export class GetRolesBodyDTO extends PagingDTO {}

export interface GetRolesRes {
  count: number;
  data: Role &
    {
      permissions: string[];
    }[];
}
