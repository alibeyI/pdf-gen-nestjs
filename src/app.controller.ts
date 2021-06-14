import { Controller, Get,Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/pdf')
  async getPDF(
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.appService.generatePDF()

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=example.pdf',
      'Content-Length': buffer.length,
    })

    res.end(buffer)
  }
}
