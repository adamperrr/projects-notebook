import { Test, TestingModule } from '@nestjs/testing';
import { CalendarDayService } from './calendar-day.service';

describe('CalendarDayService', () => {
  let service: CalendarDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendarDayService],
    }).compile();

    service = module.get<CalendarDayService>(CalendarDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
