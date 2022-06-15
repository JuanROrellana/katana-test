import { IsBoolean, IsEnum } from 'class-validator';
import { DeckTypeEnum } from '../deck.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeckDto {
  @ApiProperty({
    example: 'SHORT',
    description: 'The deck created can be SHORT OR FULL. Short will be 32 cards (lacking cards from 2 to 6).',
  })
  @IsEnum(DeckTypeEnum, { each: true })
  type: DeckTypeEnum;

  @ApiProperty({
    example: true,
    description: 'If the value is set to true the deck would be shuffle',
  })
  @IsBoolean()
  shuffled: boolean;
}
