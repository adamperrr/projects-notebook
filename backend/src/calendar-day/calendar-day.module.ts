import { Module } from "@nestjs/common";
import { CalendarDayService } from "./calendar-day.service";
import { CalendarDayController } from "./calendar-day.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { CalendarDay } from "./entities/calendar-day.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, CalendarDay])],
  controllers: [CalendarDayController],
  providers: [CalendarDayService],
})
export class CalendarDayModule {}
