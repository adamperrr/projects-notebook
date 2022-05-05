import {
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
} from "class-validator";
import { User } from "../../users/entities/user.entity";

export class CreateCalendarDayDto {
  @IsNotEmpty()
  @IsDateString()
  day: Date;

  @IsNotEmpty()
  name: string;

  description: string;

  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(0)
  @Max(24)
  workTime: number;

  owner: Partial<User>;
}
