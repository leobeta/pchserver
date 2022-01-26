import { DatabaseProvider } from './database.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
