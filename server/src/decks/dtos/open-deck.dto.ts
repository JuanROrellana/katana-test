import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OpenDeckDto {
  @ApiProperty({
    example: true,
    description: 'If the value is set to true the deck would be shuffle',
  })
  @IsBoolean()
  shuffled: boolean;
}
