import { Deck } from './deck.entity';
import { DecksController } from './decks.controller';
import { DecksService } from './decks.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deck, Card])],
  controllers: [DecksController],
  providers: [DecksService],
})
export class DecksModule {}
