import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Deck, DeckTypeEnum } from './deck.entity';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { fullDeckValues } from '../common/contants/fullDeckValues.constant';
import { shortDeckValues } from '../common/contants/shortDeckValues.constant';
import { DeckHelper } from './utils/deck.helper';
import { Card } from './card.entity';

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck) private deckRepo: Repository<Deck>,
    private deckHelper: DeckHelper,
  ) {}

  async createDeck(createDeckDto: CreateDeckDto): Promise<Deck> {
    if (createDeckDto.shuffled) {
      if (createDeckDto.type == DeckTypeEnum.FULL) {
        fullDeckValues.sort(function () {
          return 0.5 - Math.random();
        });
      }

      if (createDeckDto.type == DeckTypeEnum.SHORT) {
        shortDeckValues.sort(function () {
          return 0.5 - Math.random();
        });
      }
    }

    const deck = this.deckRepo.create({
      type: createDeckDto.type,
      shuffled: createDeckDto.shuffled,
      remaining: this.deckHelper.getRemaining(createDeckDto.type),
    });
    await this.deckRepo.save(deck);
    deck.cards = await this.deckHelper.getCards(createDeckDto.type, deck);
    return deck;
  }

  async openDeck(id: string, shuffled: boolean) {
    const deck = (await this.getDeckWithCardsById(id)) as Deck;
    if (shuffled && !deck.shuffled) {
      this.deckHelper.shuffleCards(deck);
    }
    return deck;
  }

  async drawCard(id: string): Promise<Card[]> {
    const deck = await this.getDeckWithCardsById(id);
    deck.remaining = deck.remaining - 1;
    await this.deckRepo.save(deck);
    await this.deckHelper.deleteCard(deck.cards[deck.cards.length - 1].id);
    deck.cards = deck.cards.filter(
      (card) => card.id !== deck.cards[deck.cards.length - 1].id,
    );
    return deck.cards;
  }

  async getDeckWithCardsById(id: string): Promise<Deck> {
    const deck = await this.deckRepo.findOne({
      where: {
        id: id,
      },
      relations: ['cards'],
    });
    if (!deck) {
      return null;
    }
    return deck;
  }
}
