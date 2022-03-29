import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateCalendarDayDto {
  @IsNotEmpty()
  @IsDateString()
    day: Date;

  @IsNotEmpty()
    name: string;

  @IsNotEmpty()
    description: string;

  @IsNotEmpty()
    owner: string;
}
