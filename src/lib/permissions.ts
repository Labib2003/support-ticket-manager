import { createAccessControl } from 'better-auth/plugins/access';

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = {
  tickets: ['read', 'write', 'delete'],
  users: ['read', 'write', 'delete'],
} as const;

export const ac = createAccessControl(statement);

export const roleNames = ['USER', 'ADMIN'] as const;

const USER = ac.newRole({
  tickets: ['read', 'write'],
});
const ADMIN = ac.newRole({
  tickets: ['read', 'write', 'delete'],
  users: ['read', 'write', 'delete'],
});

export const roles = {
  ADMIN,
  USER,
};
