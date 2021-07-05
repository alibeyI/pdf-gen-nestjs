import { Test, TestingModule } from '@nestjs/testing';
import { PdfGenController } from './pdf-gen.controller';

describe('PdfGenController', () => {
  let controller: PdfGenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfGenController],
    }).compile();

    controller = module.get<PdfGenController>(PdfGenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
