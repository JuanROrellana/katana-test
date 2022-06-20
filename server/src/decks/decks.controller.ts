import { Body, Controller, Post } from '@nestjs/common';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { DecksService } from './decks.service';
import { instanceToPlain } from 'class-transformer';

@Controller({
  path: 'api/decks',
  version: '1',
})
export class DecksController {
  constructor(private deckService: DecksService) {}

  @Post()
  createDek(@Body() createDeckDto: CreateDeckDto) {
    return instanceToPlain(this.deckService.createDeck(createDeckDto));
  }
}
