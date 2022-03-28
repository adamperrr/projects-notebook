import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";
import { CalendarDay } from "../../calendar-day/entities/calendar-day.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CalendarDay, (calendarDay) => calendarDay.owner)
  calendarDays: CalendarDay[];
}
