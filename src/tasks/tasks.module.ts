import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskEntity } from "./tasks.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
