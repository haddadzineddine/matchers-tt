import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RESOURCE_OWNER_KEY } from '../constants';
import { ResourceOwnerConfig } from '../types';

@Injectable()
export class ResourceOwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {

    const config = this.reflector.getAllAndOverride<ResourceOwnerConfig>(
      RESOURCE_OWNER_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log(config);

    // If no configuration is found, allow access (guard is not applied)
    if (!config) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if user exists (should be set by JwtAuthGuard)
    if (!user || !user.userId) {
      throw new ForbiddenException('User authentication required');
    }

    const resourceId = request.params[config.paramName];

    if (!resourceId) {
      throw new ForbiddenException(`Resource parameter '${config.paramName}' not found`);
    }

    if (user.userId !== resourceId) {
      const errorMessage = config.errorMessage || 'You are not allowed to access this resource.';
      throw new ForbiddenException(errorMessage);
    }

    return true;
  }
}