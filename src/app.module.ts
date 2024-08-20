import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "db",
      port: 5432,
      username: "rampup",
      password: "password",
      database: "rampup",
      autoLoadEntities: true,
      synchronize: true,
    }),
    TasksModule,
  ],
})
export class AppModule {}
