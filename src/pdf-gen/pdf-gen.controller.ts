import { Controller, Post,Body } from '@nestjs/common';
import { CreatePdfDto } from './pdf-dto/create-pdf.dto';
import { PdfResponse } from '../pdf-gen/interfaces/pdf.interface';
import { PdfGenService } from './pdf-gen.service';
import { Res } from '@nestjs/common';
import { EEXIST } from 'constants';

@Controller('pdf-gen')
export class PdfGenController {
  constructor(private service: PdfGenService) {}
  @Post()
 async  createPdf(@Body() createPdfDto: CreatePdfDto, @Res() response): Promise<PdfResponse> {
    try{
      const data = await this.service.create(createPdfDto);
      return response.send(data);
    } catch(e) {
      response.status = 500;
      return response.send({
        appName: '',
        data: null,
        description: '',
        exception: e.message,
        status: 500,
        timestamp: '',
        transaction: '',
      });
    }
  }
}
