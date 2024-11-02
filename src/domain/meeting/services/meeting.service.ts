import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { MeetingRepository } from '../repositories/meeting.repository';
import { CreateMeetingDto } from '../dto/create-meeting.dto';
import { Meeting, MeetingStatus } from '../entities/meeting.entity';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class MeetingService {
    constructor(
        private readonly meetingRepository: MeetingRepository,
        private readonly userService: UserService,
    ) {}

    async create(createMeetingDto: CreateMeetingDto, organizerId: string): Promise<Meeting> {
        const startTime = new Date(createMeetingDto.startTime);
        const endTime = new Date(createMeetingDto.endTime);

        if (endTime <= startTime) {
            throw new BadRequestException('End time must be after start time');
        }

        const meeting = await this.meetingRepository.create({
            ...createMeetingDto,
            organizer: organizerId,
            status: MeetingStatus.SCHEDULED,
        });

        return meeting;
    }

    async findAll(): Promise<Meeting[]> {
        return this.meetingRepository.findAll();
    }

    async findById(id: string): Promise<Meeting> {
        const meeting = await this.meetingRepository.findById(id);
        if (!meeting) {
            throw new NotFoundException('Meeting not found');
        }
        return meeting;
    }

    async cancel(id: string, userId: string): Promise<Meeting> {
        const meeting = await this.findById(id);

        if (meeting.organizer.toString() !== userId) {
            throw new BadRequestException('Only the organizer can cancel the meeting');
        }

        return this.meetingRepository.update(id, { status: MeetingStatus.CANCELLED });
    }
}
