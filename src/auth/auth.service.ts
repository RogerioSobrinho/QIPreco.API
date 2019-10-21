import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async createToken(emailUser: string) {
        const expiresIn = 60 * 60;
        const secretOrKey = 'secret';
        const user = { emailUser };
        const token = jwt.sign(user, secretOrKey, { expiresIn });

        return { expires_in: expiresIn, token };
    }

    async validateUser(signedUser): Promise<boolean> {
        if (signedUser && signedUser.emailUser) {
            return Boolean(this.userService.getUserByEmail(signedUser.emailUser));
        }

        return false;
    }
}
