import { applyDecorators, CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PermissionService } from '../config/permission/permission.service';

export function Permission(...required_permissions: string[]) {
  @Injectable()
  class PermissionClass implements CanActivate {
    constructor(
      @Inject(JwtService) private readonly JwtService: JwtService,
      @Inject(PermissionService) private readonly permissionService: PermissionService
    ){
      permissionService.ensurePermissionExist(...required_permissions);
    }
    
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const headers = request.headers;
      const token = headers.authorization;
      if(!token)
        throw new UnauthorizedException("no 'authorization' token provided");
      try{
        this.JwtService.verify(token);
      }catch{
        throw new UnauthorizedException("wrong token");
      }
      const payload = this.JwtService.decode(token);
      const perrmisions = payload["perrmisions"];
      for (const required_permission of required_permissions)
        if(perrmisions.includes(required_permission))
          return;
      throw new UnauthorizedException("missing permission");
    }
  }
  return applyDecorators(UseGuards(PermissionClass));
};
