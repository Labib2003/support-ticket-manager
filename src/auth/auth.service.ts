import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/dto/select-user.dto';
import { hash, verify } from '@node-rs/argon2';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { sessions, users } from 'db/schema';
import { eq } from 'drizzle-orm';
import { SignupDto } from './dto/signup.dto';

export type SessionValidationResult =
  | {
    session: Omit<typeof sessions.$inferSelect, 'id'>;
    user: Omit<typeof users.$inferSelect, 'password'>;
  }
  | { session: null; user: null };

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly drizzleService: DrizzleService,
  ) { }

  private hashPassword = async (password: string) => {
    return hash(password, {
      memoryCost: 19456, // Memory cost parameter for Argon2
      timeCost: 2, // Time cost parameter for Argon2
      outputLen: 32, // Length of the output hash
      parallelism: 1, // Degree of parallelism
    });
  };

  private verifyPassword = async (password: string, user?: User) => {
    if (!user) throw new NotFoundException('User not found');
    const passwordMatch = await verify(user.password, password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  };

  private generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    return encodeBase32LowerCaseNoPadding(bytes);
  }

  private deriveSessionId(token: string): string {
    return encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  }

  private async createSession(token: string, userId: string) {
    const sessionId = this.deriveSessionId(token);

    const expiresAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
    );

    const [session] = await this.drizzleService.db
      .insert(sessions)
      .values({
        sessionId,
        userId,
        expiresAt,
      })
      .returning();

    return session;
  }

  async validateSessionToken(token: string): Promise<SessionValidationResult> {
    const sessionId = this.deriveSessionId(token);

    const [result] = await this.drizzleService.db
      .select({
        session: sessions,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        },
      })
      .from(sessions)
      .innerJoin(users, eq(users.id, sessions.userId))
      .where(eq(sessions.sessionId, sessionId))
      .limit(1);

    if (!result) {
      return { session: null, user: null };
    }

    const { session, user } = result;

    if (Date.now() >= session.expiresAt.getTime()) {
      await this.invalidateSession(session.sessionId);
      return { session: null, user: null };
    }

    const fifteenDays = 1000 * 60 * 60 * 24 * 15;

    if (Date.now() >= session.expiresAt.getTime() - fifteenDays) {
      const newExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

      await this.drizzleService.db
        .update(sessions)
        .set({ expiresAt: newExpiry })
        .where(eq(sessions.id, session.id));

      session.expiresAt = newExpiry;
    }

    return { session, user };
  }

  async invalidateSession(sessionId: string): Promise<void> {
    await this.drizzleService.db
      .delete(sessions)
      .where(eq(sessions.sessionId, sessionId));
  }

  async signup(data: SignupDto) {
    const hashedPassword = await this.hashPassword(data.password);

    const [user] = await this.drizzleService.db
      .insert(users)
      .values({
        ...data,
        password: hashedPassword,
      })
      .returning();

    return user;
  }

  async login(data: LoginDto) {
    const [user] = await this.usersService.findByEmail(data.email);

    await this.verifyPassword(data.password, user);

    const token = this.generateSessionToken();
    await this.createSession(token, user.id);

    return { token };
  }

  async logout(sessionId: string) {
    await this.invalidateSession(sessionId);
    return { success: true };
  }
}
