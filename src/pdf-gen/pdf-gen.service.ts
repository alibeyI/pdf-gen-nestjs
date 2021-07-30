import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { PdfResponse } from './interfaces/pdf.interface';
import { CreatePdfDto } from './pdf-dto/create-pdf.dto';
// import { uuid } from 'uuidv4';
const hbs = require('hbs');
const html2pdf = require('html-pdf');
const QRCode = require('qrcode');
var bwipjs = require('bwip-js');
@Injectable()
export class PdfGenService {
  qr: any = 'salam';
  barCode: any = '';
  dataResponse: PdfResponse = {
    appName: '',
    data: {
      content:'',
      documentid:'',
    },
    description: '',
    exception: null,
    status: '',
    timestamp: '',
    transaction: '',
  };
  buf;
  constructor() {}

  async create(CreatePdfDto: CreatePdfDto): Promise<PdfResponse> {
    let option = {
      format: 'A4',
    };
    var source = CreatePdfDto;
    // hbs string data
    var template = hbs.compile(source.htmlString);
    var qrstring;
    if (source.data.qrCovid){
      qrstring = source.data.qrCovid;
    } else{
      qrstring = source.docId      
    }
    var data = source.data;
    console.log(qrstring);
    
    if (qrstring.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'string length is 0',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    // QR generator
    await new Promise((res, rej) => {
      QRCode.toDataURL(qrstring, (err, url) => {
      
          this.dataResponse.data.documentId = qrstring;

        if (err) {
          rej(err);
          console.log('error occured', err);
        } else {
          this.qr = url.replace('data:image/png;base64,', '');
          res(true);
        }
      });
    });
    // Barcode generator
    await new Promise((res, rej) => {
      bwipjs.toBuffer(
        { bcid: 'code128', text: qrstring, includetext: false },
        (err, png) => {
          if (err) {
            rej(err);
            console.log(err);
          } else {
            this.barCode = png.toString('base64');
            res(true);
          }
        },
      );
    });

    // data for map in hbs
    await new Promise((res, rej) => {
      const pdfToBase64 = () => {
        let dataS;
        if (source.data.qrCovid){
          dataS = {
            ...data,
            qrCovid: this.qr,
            barcode: this.barCode,
          };
        }else{
          dataS = {
            ...data,
            qr: this.qr,
            barcode: this.barCode,
          };
        }
          var modifedHtmlString = template(dataS);

        html2pdf.create(modifedHtmlString, option).toStream((err, stream) => {
          if (err) {
            rej(err);
            console.log('error occured', err);
          } else {
            stream.on('data', (data) => {
              this.dataResponse.data.content = data.toString('base64');
              this.dataResponse.description = 'OK';
              this.dataResponse.status = 200;
              this.dataResponse.timestamp = new Date().toLocaleDateString(
                'az-AZ',
                {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                },
              );
              res(true);
            });
          }
        });
      };
      pdfToBase64();
    });

    // ht2pd.create(modifedHtmlString, [option]).toBuffer( (err, buffer) => {
    //   if (err) {
    //     console.log('error occured', err);
    //   } else {
    //     console.log(buffer);
    //     this.data.data = buffer;
    //   }
    // });
    return this.dataResponse;
  }
}
