import { AppService } from './app.service';
import { Card } from './decks/card.entity';
import { Deck } from './decks/deck.entity';
import { DecksModule } from './decks/decks.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DecksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'katana-db',
      entities: [Deck, Card],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
