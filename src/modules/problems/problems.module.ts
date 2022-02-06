import { Module } from '@nestjs/common';
import { Problems } from './entities';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Problems])],
  providers: [ProblemsService],
  controllers: [ProblemsController],
  exports: [ProblemsService],
})
export class ProblemsModule {}
