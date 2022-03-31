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

  async createDay(
    createCalendarDayDto: CreateCalendarDayDto
  ): Promise<CalendarDay> {
    // TODO: take user from auth
    const calendarDayOwner = await this.usersRepository.findOneOrFail({
      where: {
        uuid: createCalendarDayDto.owner,
      },
    });

    const calendarDayData = {
      day: createCalendarDayDto.day,
      name: createCalendarDayDto.name,
      description: createCalendarDayDto.description,
      owner: calendarDayOwner,
    };

    const calendarDay = await this.calendarDayRepository.save(calendarDayData);

    return calendarDay;
  }

  async getCalendarDays(year: number, month: number): Promise<CalendarDay[]> {
    // TODO: take user from auth
    const calendarDayOwner = await this.usersRepository.findOneOrFail({
      where: { firstName: "Adam" },
    });

    const firstMothDay = new Date(year, month - 1, 1);
    const lastMothDay = new Date(year, month, 0);

    // type CalendarDayIsSaved = CalendarDay & { isSaved: boolean };
    // let calendar = new Array<CalendarDayIsSaved>(lastMothDay.getDate());

    // for (let dayNumber = 1; dayNumber <= lastMothDay.getDate(); dayNumber++) {
    //   const newDay: CalendarDayIsSaved = {
    //     isSaved: false,
    //     uuid: "<no_uuid>",
    //     day: new Date(year, month - 1, dayNumber),
    //     name: "<no_name>",
    //     description: "<no_description>",
    //     owner: calendarDayOwner,
    //     createdAt: new Date(year, month - 1, dayNumber),
    //     updatedAt: new Date(year, month - 1, dayNumber),
    //   };

    //   calendar[dayNumber - 1] = newDay;
    // }

    const dbDays = await this.calendarDayRepository.find({
      where: {
        owner: calendarDayOwner,
        day: Between(firstMothDay, lastMothDay),
      },
    });

    return dbDays;
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

    const calendarDay = await this.calendarDayRepository.save(day);

    return calendarDay;
  }
}
