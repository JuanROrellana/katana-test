import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Deck } from './deck.entity';

export enum SuitEnum {
  HEARTS = 'HEARTS',
  SPADES = 'SPADES',
  CLUBS = 'CLUBS',
  DIAMONDS = 'DIAMONDS',
}

export type ValueType =
  | 'ACE'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'JACK'
  | 'QUEEN'
  | 'KING';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: SuitEnum,
    default: SuitEnum.HEARTS,
  })
  suit: SuitEnum;

  @Column()
  value: string;

  @ManyToOne(() => Deck, (deck) => deck.cards)
  deck: Deck;
}
