import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    category_id: { type: Number, required: true },
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    lastUpdated: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});

export interface Category extends mongoose.Document {
    readonly id: string;
    readonly category_id: string;
    readonly name: string;
    readonly created_at: Date;
    readonly lastUpdated?: Date;
    readonly user: string;
}