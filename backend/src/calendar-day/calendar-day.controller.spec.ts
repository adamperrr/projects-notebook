import { Test, TestingModule } from '@nestjs/testing';
import { CalendarDayController } from './calendar-day.controller';
import { CalendarDayService } from './calendar-day.service';

describe('CalendarDayController', () => {
  let controller: CalendarDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarDayController],
      providers: [CalendarDayService],
    }).compile();

    controller = module.get<CalendarDayController>(CalendarDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
