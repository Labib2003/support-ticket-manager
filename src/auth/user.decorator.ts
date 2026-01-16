import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
      console.error(
        `[DEV] ${request.method} ${request.url}: User decorator used without auth guard.`,
      );
      throw new UnauthorizedException();
    }

    return request.user;
  },
);
