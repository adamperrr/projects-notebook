import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
  Req,
} from "@nestjs/common";
import { CalendarDayService } from "./calendar-day.service";
import { CreateCalendarDayDto } from "./dto/create-calendar-day.dto";
import { UpdateCalendarDayDto } from "./dto/update-calendar-day.dto";
import { v4 as uuid4 } from "uuid";
import { CalendarDay } from "./entities/calendar-day.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/users/entities/user.entity";

@UseGuards(JwtAuthGuard)
@Controller({
  path: "calendar-day",
  version: "1",
})
export class CalendarDayController {
  constructor(private readonly calendarDayService: CalendarDayService) {}

  @Post()
  createDay(
    @Req() req,
    @Body() createCalendarDayDto: CreateCalendarDayDto
  ): Promise<CalendarDay> {
    createCalendarDayDto.owner = { uuid: req.user.uuid };
    return this.calendarDayService.createDay(createCalendarDayDto);
  }

  @Get(":year/:month")
  getCalendarDays(
    @Req() req,
    @Param("year") year: number,
    @Param("month") month: number
  ): Promise<CalendarDay[]> {
    const owner: Partial<User> = { uuid: req.user.uuid };
    return this.calendarDayService.getCalendarDays(+year, +month, owner);
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
