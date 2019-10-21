import * as mongoose from 'mongoose';

export const PriceHistorySchema = new mongoose.Schema({
    price: { type: Number, required: true },
    supermarket: { type: String, required: true },
    location: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
    lastUpdated: { type: Date, required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});

export interface PriceHistory extends mongoose.Document {
    readonly id: string;
    readonly price: number;
    readonly supermarket: string;
    readonly location?: string;
    readonly created_at: Date;
    readonly lastUpdated?: Date;
    readonly user: string;
}