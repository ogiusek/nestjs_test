import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Permission } from './common/decorators/perrmision.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Post()
  @Patch()
  @Delete()
  @Permission("users:read")
  isWorking(): string {
    return this.appService.isWorking();
  }
}
