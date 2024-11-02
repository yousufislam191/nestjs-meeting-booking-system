import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { LoggerService } from './infrastructure/logger/logger.service';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Global pipes
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    // Global logger
    const logger = app.get(LoggerService);
    app.useLogger(logger);

    // Global exception filter
    app.useGlobalFilters(new HttpExceptionFilter(logger));

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
