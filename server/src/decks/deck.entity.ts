import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Card } from './card.entity';
import { Exclude } from 'class-transformer';

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

  @Column()
  remaining: number;

  @Exclude()
  @OneToMany(() => Card, (card) => card.deck)
  cards: Card[];
}
