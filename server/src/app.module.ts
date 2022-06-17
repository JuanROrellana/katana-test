import { AppService } from './app.service';
import { DecksModule } from './decks/decks.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DecksModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
