import { DecksModule } from './decks/decks.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DecksModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
