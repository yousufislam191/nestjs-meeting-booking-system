import { IsEmail, IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { Role } from '../../../core/constants/roles.enum';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEnum(Role, { each: true })
    roles: Role[];
}
