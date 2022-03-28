import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CalendarDayModule } from "./calendar-day/calendar-day.module";

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(), CalendarDayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
