import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksController } from "./tasks.controller";
import { TaskEntity } from "./tasks.entity";
import { TasksService } from "./tasks.service";

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
