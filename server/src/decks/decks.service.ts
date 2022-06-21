import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Deck, DeckTypeEnum } from './deck.entity';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { Card, SuitEnum } from './card.entity';

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck) private deckRepo: Repository<Deck>,
    @InjectRepository(Card) private cardRepo: Repository<Card>,
  ) {}

  deckValues: string[] = [
    'ACE',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'JACK',
    'QUEEN',
    'KING',
  ];

  shortDeckValues: string[] = [
    'ACE',
    '7',
    '8',
    '9',
    '10',
    'JACK',
    'QUEEN',
    'KING',
  ];

  async createDeck(createDeckDto: CreateDeckDto) {
    if (createDeckDto.shuffled) {
      if (createDeckDto.type == DeckTypeEnum.FULL){
        this.deckValues.sort(function (a, b) {
          return 0.5 - Math.random();
        });
      }

      if (createDeckDto.type == DeckTypeEnum.SHORT){
        this.shortDeckValues.sort(function (a, b) {
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

  getCards(deckType: DeckTypeEnum, deck: Deck): Promise<Card[]> {
    return deckType == DeckTypeEnum.FULL
      ? this.getFullCards(deck)
      : this.getShortCards(deck);
  }

  getRemaining(deckType: DeckTypeEnum): number {
    return deckType == DeckTypeEnum.FULL ? 52 : 32;
  }

  saveCard(value: string, suit: SuitEnum, deck: Deck): Promise<Card> {
    const card = this.cardRepo.create({ value, suit, deck });
    return this.cardRepo.save(card);
  }

  async getFullCards(deck: Deck, cards: Card[] = []): Promise<Card[]> {
    for (let idx = 0; idx < this.deckValues.length; idx++) {
      cards.push(
        await this.saveCard(this.deckValues[idx], SuitEnum.DIAMONDS, deck),
      );
      cards.push(
        await this.saveCard(this.deckValues[idx], SuitEnum.HEARTS, deck),
      );
      cards.push(
        await this.saveCard(this.deckValues[idx], SuitEnum.CLUBS, deck),
      );
      cards.push(
        await this.saveCard(this.deckValues[idx], SuitEnum.SPADES, deck),
      );
    }
    return cards;
  }

  async getShortCards(deck: Deck, cards: Card[] = []): Promise<Card[]> {
    for (let idx = 0; idx < this.shortDeckValues.length; idx++) {
      cards.push(
        await this.saveCard(this.shortDeckValues[idx], SuitEnum.DIAMONDS, deck),
      );
      cards.push(
        await this.saveCard(this.shortDeckValues[idx], SuitEnum.HEARTS, deck),
      );
      cards.push(
        await this.saveCard(this.shortDeckValues[idx], SuitEnum.CLUBS, deck),
      );
      cards.push(
        await this.saveCard(this.shortDeckValues[idx], SuitEnum.SPADES, deck),
      );
    }
    return cards;
  }
}
