import { Controller, Post, Response, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService) { }

    @Post('login')
    async loginUser(@Response() res: any, @Body() body: User) {
        if (!(body && body.email && body.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'E-mail and password are required!' });
        }

        const user = await this.userService.getUserByEmail(body.email);

        if (user) {
            if (await this.userService.compareHash(body.password, user.password)) {
                return res.status(HttpStatus.OK).json(await this.authService.createToken(user.email));
            }
        }

        return res.status(HttpStatus.FORBIDDEN).json({ message: 'E-mail or password wrong!' });
    }

    @Post('register')
    async registerUser(@Response() res: any, @Body() body: User) {
        if (!(body && body.name && body.email && body.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'E-mail, name and password are required!' });
        }

        let user = await this.userService.getUserByEmail(body.email);

        if (user) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'E-mail exists' });
        } else {
            user = await this.userService.createUser(body);
        }

        return res.status(HttpStatus.OK).json(user);
    }
}
