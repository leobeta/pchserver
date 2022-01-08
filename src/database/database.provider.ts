import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import { DynamicModule } from '@nestjs/common';
import { Environment } from 'src/common/enum';
import { TypeOrmModule } from '@nestjs/typeorm';

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const isDevelopmentEnv = config.get('NODE_ENV') !== Environment.PRODUCTION;
    const dbConfig = {
      type: 'mysql',
      host: config.get('DB_HOST'),
      port: Number(config.get('DB_PORT')),
      username: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
      autoLoadEntities: true,
      synchronize: isDevelopmentEnv,
      logging: config.get('DB_LOGGING'),
    } as ConnectionOptions;
    return dbConfig;
  },
});
