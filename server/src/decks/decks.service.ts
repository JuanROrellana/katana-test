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

  valueType: string[] = [
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

  async createDeck(createDeckDto: CreateDeckDto) {
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

  async getFullCards(deck: Deck): Promise<Card[]> {
    const cards: Card[] = [];
    for (let idx = 0; idx < this.valueType.length; idx++) {
      cards.push(
        await this.saveCard(this.valueType[idx], SuitEnum.DIAMONDS, deck),
      );
      cards.push(
        await this.saveCard(this.valueType[idx], SuitEnum.HEARTS, deck),
      );
      cards.push(
        await this.saveCard(this.valueType[idx], SuitEnum.CLUBS, deck),
      );
      cards.push(
        await this.saveCard(this.valueType[idx], SuitEnum.SPADES, deck),
      );
    }
    return cards;
  }

  async getShortCards(deck: Deck): Promise<Card[]> {
    const cards: Card[] = [];
    cards.push(await this.saveCard(this.valueType[0], SuitEnum.DIAMONDS, deck));
    cards.push(await this.saveCard(this.valueType[0], SuitEnum.HEARTS, deck));
    cards.push(await this.saveCard(this.valueType[0], SuitEnum.CLUBS, deck));
    cards.push(await this.saveCard(this.valueType[0], SuitEnum.SPADES, deck));

    for (let idx = 6; idx < this.valueType.length; idx++) {
      cards.push(
        await this.saveCard(this.valueType[idx], SuitEnum.DIAMONDS, deck),
      );
      cards.push(
        await this.saveCard(this.valueType[idx], SuitEnum.HEARTS, deck),
      );
      cards.push(
        await this.saveCard(this.valueType[idx], SuitEnum.CLUBS, deck),
      );
      cards.push(
        await this.saveCard(this.valueType[idx], SuitEnum.SPADES, deck),
      );
    }
    return cards;
  }
}
