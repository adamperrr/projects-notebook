import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CalendarDayModule } from "./calendar-day/calendar-day.module";
import { UsersService } from "./users/users.service";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { AuthController } from "./auth/auth.controller";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    CalendarDayModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
