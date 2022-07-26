import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonController } from './person/person.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, PersonController],
  providers: [AppService],
})
export class AppModule {}
