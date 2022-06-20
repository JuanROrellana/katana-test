import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Deck } from './deck.entity';

export enum SuitEnum {
  HEARTS = 'HEARTS',
  SPADES = 'SPADES',
  CLUBS = 'CLUBS',
  DIAMONDS = 'DIAMONDS',
}

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
