import { plainToInstance, Type } from "class-transformer";
import {
  IsPort,
  IsString,
  IsStrongPassword,
  validateSync,
  ValidateNested,
  ValidateIf,
} from "class-validator";

class DbConfig {
  @IsString()
  host: string;

  @IsPort()
  port: string;

  @IsString()
  database: string;

  @IsString()
  username: string;

  @ValidateIf(() => process.env.NODE_ENV === "production")
  @IsStrongPassword()
  password: string;
}

class AppConfig {
  @IsPort()
  port: string;

  @Type(() => DbConfig)
  @ValidateNested()
  database: DbConfig;
}

const validateConfig = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(AppConfig, config);
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};

export default () => {
  const config = {
    port: process.env.PORT || "3000",
    database: {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || "5432",
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
  };

  return validateConfig(config);
};
