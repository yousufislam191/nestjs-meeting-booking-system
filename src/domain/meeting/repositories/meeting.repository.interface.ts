import { Meeting } from '../entities/meeting.entity';
import { CreateMeetingDto } from '../dto/create-meeting.dto';

export interface IMeetingRepository {
    create(createMeetingDto: CreateMeetingDto): Promise<Meeting>;
    findAll(): Promise<Meeting[]>;
    findById(id: string): Promise<Meeting | null>;
    update(id: string, updateData: Partial<Meeting>): Promise<Meeting | null>;
    delete(id: string): Promise<boolean>;
}
