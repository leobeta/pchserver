import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { CaseHistoryModule } from './modules/case-history/case-history.module';
import { ComplaintsModule } from './modules/complaints/complaints.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'my-weak-password',
      database: 'app_pch',
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    CaseHistoryModule,
    ComplaintsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
