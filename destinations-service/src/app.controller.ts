import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/destinations')
  getDestinations(): object {
    return this.appService.getDestinations();
  }

  @Get('/destinations/:id')
  getDestination(@Param('id') id): object {
    return this.appService.getDestination(id);
  }
}
