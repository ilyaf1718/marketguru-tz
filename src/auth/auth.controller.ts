import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/authUser.dto';

@ApiTags('Authorization and authentication')
@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @ApiOperation({summary: 'Authorization'})
    @Post('login')
    login(@Body() loginDto: AuthUserDto) {
        return this.authService.login(loginDto);
    }

    @ApiOperation({summary: 'Registration'})
    @Post('register')
    register(@Body() userDto: CreateUserDto) {
        return this.authService.register(userDto);
    }
}
