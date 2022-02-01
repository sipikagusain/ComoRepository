import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocialBladeModule } from './social-blade/social-blade.module';
import { SocialBladeEntity } from './Repository/Entity/SocialBladeEntity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    SocialBladeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'postgres',
      synchronize: true,
      entities: [SocialBladeEntity],
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
