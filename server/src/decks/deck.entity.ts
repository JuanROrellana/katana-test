import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Card } from './card.entity';

export enum DeckTypeEnum {
  FULL = 'FULL',
  SHORT = 'SHORT',
}

@Entity()
export class Deck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: DeckTypeEnum,
    default: DeckTypeEnum.FULL,
  })
  type: DeckTypeEnum;

  @Column()
  shuffled: boolean;

  @OneToMany(() => Card, (card) => card.deck)
  cards: Card[];
}
