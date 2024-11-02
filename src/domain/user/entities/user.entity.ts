import { Document } from 'mongoose';
import { Role } from '../../../core/constants/roles.enum';

export class User extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
}
