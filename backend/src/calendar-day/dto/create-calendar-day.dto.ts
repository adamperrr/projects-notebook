import { IsDateString, IsNotEmpty } from "class-validator";
import { User } from "../../user/entities/user.entity";

export class CreateCalendarDayDto {
  @IsNotEmpty()
  @IsDateString()
  day: Date;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  owner: Partial<User>;
}
