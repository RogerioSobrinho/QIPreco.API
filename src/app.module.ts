import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { UserModule } from './user/user.module';
import { PriceHistoryModule } from './price-history/price-history.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest', { useNewUrlParser: true }),
    ProductModule,
    CategoryModule,
    BrandModule,
    PriceHistoryModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule { }
