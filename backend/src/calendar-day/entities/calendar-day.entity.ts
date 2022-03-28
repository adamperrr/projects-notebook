import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsDate, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { User } from "../../user/entities/user.entity";

@Entity()
export class CalendarDay {
  @PrimaryGeneratedColumn("uuid")
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  @Column({ type: "date" })
  @IsNotEmpty()
  @IsDate()
  day: Date;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsOptional()
  description: string;

  @ManyToOne(() => User, (user) => user.calendarDays)
  owner: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
