import { Controller, Get,Res,Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Post('/pdf')
  // async getPDF(
  //   @Res() res: Response,
  // ): Promise<void> {
  //   // const buffer = await this.appService.generatePDF()

  //   res.set({
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': 'inline; filename=example.pdf',
  //     // 'Content-Length': ,
  //   })

  //   res.end()
  // }
}
