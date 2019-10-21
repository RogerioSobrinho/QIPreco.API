import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Products') private readonly productModel: Model<Product>) { }

    async getAll(): Promise<Product[]> {
        return await this.productModel.find();
    }

    async getById(productId: number): Promise<Product> {
        return await this.productModel.find({ product_id: productId })[0];
    }

    async getByEAN(ean: string): Promise<Product> {
        return await this.productModel.find({ ean })[0];
    }

    async create(product: Product): Promise<Product> {
        const prodModel = new this.productModel(product);
        const result = await prodModel.save();
        return result;
    }

    async delete(productId: number): Promise<Product> {
        const result = await this.productModel.find({ product_id: productId })[0];
        if (result) {
            await this.productModel.delete({ product_id: productId });
        }
        return result;
    }

    async update(product: Product): Promise<Product> {
        const result = await this.productModel.find({ product_id: product.product_id })[0];
        if (result) {
            await this.productModel.update(product);
        }
        return result;
    }
}
