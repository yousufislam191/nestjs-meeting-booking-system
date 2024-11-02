import { Schema } from 'mongoose';
import { Role } from '../../../core/constants/roles.enum';

export const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        roles: [{ type: String, enum: Role, default: [Role.USER] }],
    },
    {
        timestamps: true,
    },
);
