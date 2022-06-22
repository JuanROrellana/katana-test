import { DecksController } from './decks.controller';
import { DecksService } from './decks.service';
import { DeckHelper } from './utils/deck.helper';

describe('DecksController', () => {
  let controller: DecksController;
  let deckService: DecksService;
  let deckHelper: DeckHelper;

  beforeEach(async () => {
    deckService = new DecksService(null, deckHelper);
    controller = new DecksController(deckService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
