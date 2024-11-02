import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
    log(message: string, context?: any) {
        console.log(`[LOG] ${message}`, context);
    }

    error(message: string, trace?: string, context?: any) {
        console.error(`[ERROR] ${message}`, trace, context);
    }

    warn(message: string, context?: any) {
        console.warn(`[WARN] ${message}`, context);
    }

    debug(message: string, context?: any) {
        console.debug(`[DEBUG] ${message}`, context);
    }

    verbose(message: string, context?: any) {
        console.log(`[VERBOSE] ${message}`, context);
    }
}
