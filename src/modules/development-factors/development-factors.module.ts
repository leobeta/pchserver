import { DevelopmentFactors } from './entities';
import { DevelopmentFactorsController } from './development-factors.controller';
import { DevelopmentFactorsService } from './development-factors.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DevelopmentFactors])],
  providers: [DevelopmentFactorsService],
  controllers: [DevelopmentFactorsController],
  exports: [DevelopmentFactorsService],
})
export class DevelopmentFactorsModule {}
