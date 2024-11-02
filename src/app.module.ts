import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongodbModule } from './infrastructure/database/mongodb/mongodb.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { LoggerService } from './infrastructure/logger/logger.service';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { UserModule } from './domain/user/user.module';
import { MeetingModule } from './domain/meeting/meeting.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        MongodbModule,
        UserModule,
        MeetingModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        LoggerService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
