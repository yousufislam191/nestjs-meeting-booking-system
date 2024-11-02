import { Document } from 'mongoose';
import { User } from '../../user/entities/user.entity';

export enum MeetingStatus {
    SCHEDULED = 'scheduled',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
}

export class Meeting extends Document {
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    organizer: User;
    participants: User[];
    status: MeetingStatus;
    createdAt: Date;
    updatedAt: Date;
}
