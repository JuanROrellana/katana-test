import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { DecksService } from './decks.service';
import { instanceToPlain } from 'class-transformer';
import { ApiResponse } from '@nestjs/swagger';
import { Deck } from './deck.entity';

@Controller({
  path: 'api/decks',
  version: '1',
})
export class DecksController {
  constructor(private deckService: DecksService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. The Body has incorrect data',
  })
  createDek(@Body() createDeckDto: CreateDeckDto): Deck {
    return <Deck>instanceToPlain(this.deckService.createDeck(createDeckDto));
  }

  @Get('/:id/:shuffled')
  @ApiResponse({
    status: 200,
    description: 'Data returned correctly.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  openDeck(@Param('id') id: string, @Param('shuffled') shuffled: boolean) {
    return this.deckService.openDeck(id, shuffled);
  }

  @Patch('/:id')
  @ApiResponse({
    status: 200,
    description: 'Data updated correctly.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  drawCard(@Param('id') id: string) {
    return this.deckService.drawCard(id);
  }
}
