import { Test, TestingModule } from '@nestjs/testing';
import { SocialBladeService } from './social-blade.service';

describe('SocialBladeService', () => {
  let service: SocialBladeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialBladeService],
    }).compile();

    service = module.get<SocialBladeService>(SocialBladeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
