import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CalendarDayModule } from "./calendar-day/calendar-day.module";

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(), CalendarDayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
