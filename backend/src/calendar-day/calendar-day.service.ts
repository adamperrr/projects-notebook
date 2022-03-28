import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { CreateCalendarDayDto } from "./dto/create-calendar-day.dto";
import { UpdateCalendarDayDto } from "./dto/update-calendar-day.dto";
import { CalendarDay } from "./entities/calendar-day.entity";
import { v4 as uuid4 } from "uuid";

@Injectable()
export class CalendarDayService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(CalendarDay)
    private readonly calendarDayRepository: Repository<CalendarDay>
  ) {}

  async createMonthDay(
    createCalendarDayDto: CreateCalendarDayDto
  ): Promise<CalendarDay> {
    const calendarDayOwner = await this.usersRepository.findOneOrFail(
      createCalendarDayDto.owner
    );
    const calendarDayData = {
      day: createCalendarDayDto.day,
      name: createCalendarDayDto.name,
      description: createCalendarDayDto.description,
      owner: calendarDayOwner,
    };

    const calendarDay = await this.calendarDayRepository.save(calendarDayData);

    return calendarDay;
  }

  async findAllMonthDays(
    owner: string,
    year: number,
    month: number
  ): Promise<CalendarDay[]> {
    const calendarDayOwner = await this.usersRepository.findOneOrFail(owner);

    const firstMothDay = new Date(year, month - 1, 1);
    const lastMothDay = new Date(year, month, 0);

    const days = await this.calendarDayRepository.find({
      where: {
        owner: calendarDayOwner,
        day: Between(firstMothDay, lastMothDay),
      },
    });

    return days;
  }

  async findOneMonthDay(dayUuid: uuid4): Promise<CalendarDay> {
    const day = await this.calendarDayRepository.findOneOrFail({
      where: {
        uuid: dayUuid,
      },
    });

    return day;
  }

  async updateOneMonthDay(
    dayUuid: uuid4,
    updateCalendarDayDto: UpdateCalendarDayDto
  ): Promise<CalendarDay> {
    const day = await this.calendarDayRepository.findOneOrFail({
      where: {
        uuid: dayUuid,
      },
    });

    day.name = updateCalendarDayDto.name;
    day.description = updateCalendarDayDto.description;

    const calendarDay = await this.calendarDayRepository.save(day);

    return calendarDay;
  }
}