import { Controller, Get, Post, Body, UseGuards, Param, Put } from '@nestjs/common';
import { MeetingService } from '../../domain/meeting/services/meeting.service';
import { CreateMeetingDto } from '../../domain/meeting/dto/create-meeting.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { Role } from '../../core/constants/roles.enum';
import { CurrentUser } from '../../core/decorators/current-user.decorator';

@Controller('meetings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MeetingController {
    constructor(private readonly meetingService: MeetingService) {}

    @Post()
    @Roles(Role.ADMIN, Role.USER)
    async createMeeting(@Body() createMeetingDto: CreateMeetingDto, @CurrentUser() user: any) {
        return this.meetingService.create(createMeetingDto, user._id);
    }

    @Get()
    @Roles(Role.ADMIN, Role.USER)
    async findAll() {
        return this.meetingService.findAll();
    }

    @Get(':id')
    @Roles(Role.ADMIN, Role.USER)
    async findOne(@Param('id') id: string) {
        return this.meetingService.findById(id);
    }

    @Put(':id/cancel')
    @Roles(Role.ADMIN, Role.USER)
    async cancelMeeting(@Param('id') id: string, @CurrentUser() user: any) {
        return this.meetingService.cancel(id, user._id);
    }
}
