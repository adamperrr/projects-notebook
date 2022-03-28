import { IsDate, IsNotEmpty } from "class-validator";

export class CreateCalendarDayDto {
  @IsNotEmpty()
  @IsDate()
  day: Date;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  owner: string;
}
