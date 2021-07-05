import { Module } from '@nestjs/common';
import { PdfGenController } from './pdf-gen.controller';
import { PdfGenService } from './pdf-gen.service';

@Module({
  controllers: [PdfGenController],
  providers: [PdfGenService],
})
export class PdfGenModule {}
