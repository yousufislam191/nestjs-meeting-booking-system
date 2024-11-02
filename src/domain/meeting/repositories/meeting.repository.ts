import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meeting } from '../entities/meeting.entity';
import { CreateMeetingDto } from '../dto/create-meeting.dto';
import { IMeetingRepository } from './meeting.repository.interface';

@Injectable()
export class MeetingRepository implements IMeetingRepository {
    constructor(@InjectModel(Meeting.name) private readonly meetingModel: Model<Meeting>) {}

    async create(createMeetingDto: CreateMeetingDto): Promise<Meeting> {
        const meeting = new this.meetingModel(createMeetingDto);
        return meeting.save();
    }

    async findAll(): Promise<Meeting[]> {
        return this.meetingModel.find().populate('organizer', 'firstName lastName email').populate('participants', 'firstName lastName email').exec();
    }

    async findById(id: string): Promise<Meeting | null> {
        return this.meetingModel.findById(id).populate('organizer', 'firstName lastName email').populate('participants', 'firstName lastName email').exec();
    }

    async update(id: string, updateData: Partial<Meeting>): Promise<Meeting | null> {
        return this.meetingModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .populate('organizer', 'firstName lastName email')
            .populate('participants', 'firstName lastName email')
            .exec();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.meetingModel.deleteOne({ _id: id }).exec();
        return result.deletedCount === 1;
    }
}
