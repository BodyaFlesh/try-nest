import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentiaks.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void>{
        console.log(authCredentialsDto);
        return this.authService.signUp(authCredentialsDto);
    }

}