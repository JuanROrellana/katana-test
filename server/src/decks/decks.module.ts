import { Deck } from './deck.entity';
import { DecksController } from './decks.controller';
import { DecksService } from './decks.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Deck])],
  controllers: [DecksController],
  providers: [DecksService],
})
export class DecksModule {}
