import { IsNotEmpty, IsString, IsDateString, IsArray, ArrayMinSize, IsOptional } from 'class-validator';

export class CreateMeetingDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsDateString()
    startTime: string;

    @IsNotEmpty()
    @IsDateString()
    endTime: string;

    @IsArray()
    @ArrayMinSize(1)
    participants: string[];

    @IsNotEmpty()
    organizer: string;

    @IsNotEmpty()
    status: string;
}
