import { Schema } from 'mongoose';
import { MeetingStatus } from '../../../domain/meeting/entities/meeting.entity';

export const MeetingSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        status: {
            type: String,
            enum: Object.values(MeetingStatus),
            default: MeetingStatus.SCHEDULED,
        },
    },
    {
        timestamps: true,
    },
);
