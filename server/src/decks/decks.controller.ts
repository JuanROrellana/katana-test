import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { DecksService } from './decks.service';
import { instanceToPlain } from 'class-transformer';
import { OpenDeckDto } from './dtos/open-deck.dto';

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

  @Get('/:id')
  openDeck(@Param('id') id: string, @Body() openDeckDto: OpenDeckDto) {
    return this.deckService.openDeck(id, openDeckDto);
  }

  @Patch('/:id')
  drawCard(@Param('id') id: string) {
    return this.deckService.drawCard(id);
  }
}
