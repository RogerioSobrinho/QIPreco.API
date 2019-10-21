import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    lastUpdated: { type: Date },
});

export interface User extends mongoose.Document {
    readonly name: string;
    readonly email: string;
    password: string;
    readonly created_at: Date;
    readonly lastUpdated?: Date;
}