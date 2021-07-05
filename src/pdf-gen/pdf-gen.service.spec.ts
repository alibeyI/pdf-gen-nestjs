import { Test, TestingModule } from '@nestjs/testing';
import { PdfGenService } from './pdf-gen.service';

describe('PdfGenService', () => {
  let service: PdfGenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfGenService],
    }).compile();

    service = module.get<PdfGenService>(PdfGenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
