import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
