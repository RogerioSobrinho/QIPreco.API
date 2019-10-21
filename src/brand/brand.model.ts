import * as mongoose from 'mongoose';

export const BrandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    lastUpdated: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});

export interface Brand extends mongoose.Document {
    readonly id: string;
    readonly name: string;
    readonly created_at: Date;
    readonly lastUpdated?: Date;
    readonly user: string;
}