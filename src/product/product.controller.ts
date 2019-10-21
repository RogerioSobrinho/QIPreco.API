import { Controller, Get, Response, HttpStatus, Req, Request, Delete, Put, Post, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getAll(@Req() req: Request, @Response() res: any) {
        try {
            const result = await this.productService.getAll();
            res.status(HttpStatus.OK).json(result);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Get(':productId')
    async get(@Req() req: Request, @Response() res: any, @Param() params) {
        try {
            let result = await this.productService.getById(params.productId);
            if (!result) {
                result = await this.productService.getByEAN(params.productId);
            }
            res.status(HttpStatus.OK).json(result);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Post()
    async save(@Req() req: Request, @Response() res: any, @Body() product: Product) {
        console.log(product);
    }

    @Put(':productId')
    async update(@Req() req: Request, @Response() res: any) { }

    @Delete(':productId')
    async delete(@Req() req: Request, @Response() res: any) { }
}
