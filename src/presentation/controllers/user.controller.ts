import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UserService } from '../../domain/user/services/user.service';
import { CreateUserDto } from '../../domain/user/dto/create-user.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { Role } from '../../core/constants/roles.enum';
import { CurrentUser } from '../../core/decorators/current-user.decorator';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser() user: any) {
        return user;
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async findAll() {
        return this.userService.findAll();
    }
}
