import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class CalendarDay {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "date" })
  day: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "float", default: 0 })
  workTime: number;

  @ManyToOne(() => User, (user) => user.calendarDays)
  owner: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
