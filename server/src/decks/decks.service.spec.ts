import { Test, TestingModule } from '@nestjs/testing';
import { DecksService } from './decks.service';
import { DeckHelper } from './utils/deck.helper';

describe('DecksService', () => {
  let service: DecksService;
  let deckHelper: DeckHelper;

  beforeEach(async () => {
    deckHelper = new DeckHelper(null);
    service = new DecksService(null, deckHelper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
