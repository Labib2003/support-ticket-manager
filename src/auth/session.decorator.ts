import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const Session = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.session) {
      console.error(
        `[DEV] ${request.method} ${request.url}: Session decorator used without auth guard.`,
      );
      throw new UnauthorizedException();
    }

    return request.session;
  },
);
