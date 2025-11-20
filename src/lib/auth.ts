import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db from './db';
import { trustedOrigins } from '../config/cors';
import { admin } from 'better-auth/plugins';
import { ac, roles } from './permissions';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    disableSignUp: true,
  },
  trustedOrigins: trustedOrigins,
  user: {
    additionalFields: {
      role: {
        type: 'string',
      },
    },
  },
  plugins: [
    admin({
      ac,
      roles,
    }),
  ],
});
