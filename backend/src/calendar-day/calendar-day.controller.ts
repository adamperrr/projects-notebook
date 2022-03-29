import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from "@nestjs/common";
import { CalendarDayService } from "./calendar-day.service";
import { CreateCalendarDayDto } from "./dto/create-calendar-day.dto";
import { UpdateCalendarDayDto } from "./dto/update-calendar-day.dto";
import { v4 as uuid4 } from "uuid";
import { CalendarDay } from "./entities/calendar-day.entity";

@Controller({
  path: "calendar-day",
  version: "1",
})
export class CalendarDayController {
  constructor(private readonly calendarDayService: CalendarDayService) {}

  @Post()
  createDay(
    @Body() createCalendarDayDto: CreateCalendarDayDto
  ): Promise<CalendarDay> {
    return this.calendarDayService.createDay(createCalendarDayDto);
  }

  @Get(":year/:month")
  getMonthDays(
    @Param("year") year: number,
    @Param("month") month: number
  ): Promise<CalendarDay[]> {
    return this.calendarDayService.getMonthDays(+year, +month);
  }

  @Get(":uuid")
  getCalendarDay(@Param("uuid") dayUuid: uuid4): Promise<CalendarDay> {
    return this.calendarDayService.getCalendarDay(dayUuid);
  }

  @Patch(":uuid")
  updateCalendarDay(
    @Param("uuid") dayUuid: uuid4,
    @Body() updateCalendarDayDto: UpdateCalendarDayDto
  ): Promise<CalendarDay> {
    return this.calendarDayService.updateCalendarDay(
      dayUuid,
      updateCalendarDayDto
    );
  }
}
