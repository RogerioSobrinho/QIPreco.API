import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    product_id: { type: String, required: true },
    ean: { type: String },
    name: { type: String, required: true },
    short_name: { type: String, required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brands' },
    description: { type: String, required: false },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' }],
    priceHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PriceHistory' }],
    created_at: { type: Date, default: Date.now },
    lastUpdated: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});

export interface Product extends mongoose.Document {
    readonly id: string;
    readonly product_id: string;
    readonly ean?: string;
    readonly name: string;
    readonly short_name: string;
    readonly brand?: string;
    readonly description?: string;
    readonly category?: string[];
    readonly price: number;
    readonly created_at: Date;
    readonly lastUpdated?: Date;
    readonly user: string;
}