import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';
import { CategoryModule } from './category/category.module';
import { QuizModule } from './quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./src/config/env/.env`,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
    DataModule,
    CategoryModule,
    QuizModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
