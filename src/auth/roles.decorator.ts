import { SetMetadata } from '@nestjs/common';
import { userRoles } from 'db/schema';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: (typeof userRoles.enumValues)[number][]) =>
  SetMetadata(ROLES_KEY, roles);
