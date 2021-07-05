import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfGenModule } from './pdf-gen/pdf-gen.module';

@Module({
  imports: [ PdfGenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
