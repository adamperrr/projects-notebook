import { PartialType } from '@nestjs/mapped-types';
import { CreateCalendarDayDto } from './create-calendar-day.dto';

export class UpdateCalendarDayDto extends PartialType(CreateCalendarDayDto) {}
