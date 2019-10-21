import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private saltRounds = 10;
    constructor(@InjectModel('Users') private readonly userModel: Model<User>) { }

    async getUserByEmail(email: string): Promise<User> {
        const result = (await this.userModel.find({ email }))[0];
        return result;
    }

    async createUser(user: User): Promise<User> {
        user.password = await this.getHash(user.password);
        const createdUser = new this.userModel(user);
        const result = await createdUser.save(user);
        result.password = undefined;
        return result;
    }

    async getHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
