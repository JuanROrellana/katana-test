import { IsBoolean, IsEnum } from 'class-validator';
import { DeckTypeEnum } from '../deck.entity';

export class CreateDeckDto {
  @IsEnum(DeckTypeEnum, { each: true })
  type: DeckTypeEnum;

  @IsBoolean()
  shuffled: boolean;
}
