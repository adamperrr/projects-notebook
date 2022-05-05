import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
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

  async createDay(
    createCalendarDayDto: CreateCalendarDayDto
  ): Promise<CalendarDay> {
    const calendarDayOwner = await this.usersRepository.findOneOrFail(
      createCalendarDayDto.owner
    );

    const calendarDayData = {
      day: createCalendarDayDto.day,
      name: createCalendarDayDto.name,
      description: createCalendarDayDto.description,
      workTime: createCalendarDayDto.workTime,
      owner: calendarDayOwner,
    };

    const calendarDay = await this.calendarDayRepository.save(calendarDayData);
    delete calendarDay.owner.password;

    return calendarDay;
  }

  async getCalendarDays(
    year: number,
    monthNumber: number,
    owner: Partial<User>
  ): Promise<CalendarDay[]> {
    const calendarDayOwner = await this.usersRepository.findOneOrFail(owner);

    const firstMothDay = new Date(year, monthNumber - 1, 1);
    const lastMothDay = new Date(year, monthNumber, 0);

    const daysFromDb = await this.calendarDayRepository.find({
      where: {
        owner: calendarDayOwner,
        day: Between(firstMothDay, lastMothDay),
      },
    });

    return daysFromDb;
  }

  async getCalendarDay(dayUuid: uuid4): Promise<CalendarDay> {
    const day = await this.calendarDayRepository.findOneOrFail({
      where: {
        uuid: dayUuid,
      },
    });

    return day;
  }

  async updateCalendarDay(
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
    day.workTime = updateCalendarDayDto.workTime;

    const calendarDay = await this.calendarDayRepository.save(day);

    return calendarDay;
  }
}
