import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DecksModule } from './decks/decks.module';

@Module({
  imports: [DecksModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
