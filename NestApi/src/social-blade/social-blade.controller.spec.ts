import { Test, TestingModule } from '@nestjs/testing';
import { SocialBladeController } from './social-blade.controller';

describe('SocialBladeController', () => {
  let controller: SocialBladeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialBladeController],
    }).compile();

    controller = module.get<SocialBladeController>(SocialBladeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
