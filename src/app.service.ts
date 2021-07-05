import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Wor1ld!';
  }
}
