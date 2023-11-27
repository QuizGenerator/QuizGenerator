import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export const getUserId = createParamDecorator((data, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();
  return req.user.id;
});
