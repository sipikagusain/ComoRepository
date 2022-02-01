import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialBladeEntity } from 'src/Repository/Entity/SocialBladeEntity';
import { SocialBladeController } from './social-blade.controller';
import { SocialBladeService } from './social-blade.service';

@Module({
  imports: [TypeOrmModule.forFeature([SocialBladeEntity])],
  providers: [SocialBladeService],
  controllers: [SocialBladeController],
})
export class SocialBladeModule {}
