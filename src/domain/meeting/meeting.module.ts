import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingController } from '../../presentation/controllers/meeting.controller';
import { MeetingService } from './services/meeting.service';
import { MeetingRepository } from './repositories/meeting.repository';
import { MeetingSchema } from '../../infrastructure/database/schemas/meeting.schema';
import { Meeting } from './entities/meeting.entity';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }]),
        UserModule, // Import UserModule as we need UserService in MeetingService
    ],
    controllers: [MeetingController],
    providers: [
        MeetingService,
        MeetingRepository,
        {
            provide: 'IMeetingRepository',
            useClass: MeetingRepository,
        },
    ],
    exports: [MeetingService, MeetingRepository],
})
export class MeetingModule {}
