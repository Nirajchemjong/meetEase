import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AvailabilitiesService } from './modules/availabilities/availabilities.service';
import { AvailabilitiesController } from './modules/availabilities/availabilities.controller';
import { AvailabilitiesModule } from './modules/availabilities/availabilities.module';


@Module({
  imports: [UsersModule, PrismaModule, AvailabilitiesModule],
  providers: [PrismaService, AvailabilitiesService],
  controllers: [AvailabilitiesController],
})
export class AppModule {}
