import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Deck } from './deck.entity';
import { CreateDeckDto } from './dtos/create-deck.dto';

@Injectable()
export class DecksService {
  constructor(@InjectRepository(Deck) private repo: Repository<Deck>) {}

  async createDeck(createDeckDto: CreateDeckDto) {
    const deck = this.repo.create({
      type: createDeckDto.type,
      shuffled: createDeckDto.shuffled,
    });
    return this.repo.save(deck);
  }
}
