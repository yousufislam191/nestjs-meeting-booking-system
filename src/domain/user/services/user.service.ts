import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
// import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.userRepository.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        return this.sanitizeUser(user);
    }

    async findAll() {
        const users = await this.userRepository.findAll();
        return users.map(user => this.sanitizeUser(user));
    }

    async findById(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.sanitizeUser(user);
    }

    async findByEmail(email: string) {
        return this.userRepository.findByEmail(email);
    }

    private sanitizeUser(user: any) {
        const sanitized = user.toObject();
        delete sanitized.password;
        return sanitized;
    }
}
