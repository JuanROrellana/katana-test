import { Deck, DeckTypeEnum } from '../deck.entity';
import { Injectable } from '@nestjs/common';
import { Card, SuitEnum } from '../card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { shortDeckValues } from '../../common/contants/shortDeckValues.constant';
import { fullDeckValues } from '../../common/contants/fullDeckValues.constant';

@Injectable()
export class DeckHelper {
  constructor(@InjectRepository(Card) private cardRepo: Repository<Card>) {}

  getRemaining(deckType: DeckTypeEnum): number {
    return deckType == DeckTypeEnum.FULL ? 52 : 32;
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

  saveCard(value: string, suit: SuitEnum, deck: Deck): Promise<Card> {
    const card = this.cardRepo.create({ value, suit, deck });
    return this.cardRepo.save(card);
  }

  async deleteCard(id: string): Promise<void> {
    await this.cardRepo.delete(id);
  }

  shuffleCards(deck: Deck): void {
    deck.cards.sort();
    //TODO: shuffle Cards
  }
}
