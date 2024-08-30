import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

function setupSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle("RampUp: Tasks API")
    .setDescription("42 Labs Ramp Up project for Soulloop.")
    .setVersion("1.0")
    .addTag("tasks")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  setupSwagger(app);

  await app.listen(configService.get("port"));
}
bootstrap();
