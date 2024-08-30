import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import appConfig from "./app.config";
import { AuthModule } from "./auth/auth.module";
import { HashModule } from "./hash/hash.module";
import { TasksModule } from "./tasks/tasks.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("database.host"),
        port: configService.get("database.port"),
        username: configService.get("database.username"),
        password: configService.get("database.password"),
        database: configService.get("database.name"),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TasksModule,
    AuthModule,
    UsersModule,
    HashModule,
  ],
})
export class AppModule {}
