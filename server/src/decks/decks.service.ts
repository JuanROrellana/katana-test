import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Deck, DeckTypeEnum } from './deck.entity';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { Card, SuitEnum } from './card.entity';
import { fullDeckValues } from '../common/contants/fullDeckValues.constant';
import { shortDeckValues } from '../common/contants/shortDeckValues.constant';

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck) private deckRepo: Repository<Deck>,
    @InjectRepository(Card) private cardRepo: Repository<Card>,
  ) {}

  async createDeck(createDeckDto: CreateDeckDto) {
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
      remaining: this.getRemaining(createDeckDto.type),
    });
    await this.deckRepo.save(deck);
    deck.cards = await this.getCards(createDeckDto.type, deck);
    return deck;
  }

  async getCards(deckType: DeckTypeEnum, deck: Deck): Promise<Card[]> {
    let deckToLoop: string[];
    const cards: Card[] = [];
    if (deckType == DeckTypeEnum.SHORT) {
      deckToLoop = shortDeckValues;
    } else {
      deckToLoop = fullDeckValues;
    }
    for (let idx = 0; idx < deckToLoop.length; idx++) {
      cards.push(await this.saveCard(deckToLoop[idx], SuitEnum.DIAMONDS, deck));
      cards.push(await this.saveCard(deckToLoop[idx], SuitEnum.HEARTS, deck));
      cards.push(await this.saveCard(deckToLoop[idx], SuitEnum.CLUBS, deck));
      cards.push(await this.saveCard(deckToLoop[idx], SuitEnum.SPADES, deck));
    }
    return cards;
  }

  getRemaining(deckType: DeckTypeEnum): number {
    return deckType == DeckTypeEnum.FULL ? 52 : 32;
  }

  saveCard(value: string, suit: SuitEnum, deck: Deck): Promise<Card> {
    const card = this.cardRepo.create({ value, suit, deck });
    return this.cardRepo.save(card);
  }
}
