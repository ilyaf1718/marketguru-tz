import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { AuthUserDto } from './dto/authUser.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async login(loginDto: AuthUserDto) {
        const user = await this.validateUser(loginDto);

        return this.generateToken(user);
    }

    async register(userDto: CreateUserDto) {

        if (userDto.email) {
            const userByEmail = await this.usersService.getByEmail(userDto.email); 
          
            if (userByEmail)
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        
        if (userDto.phone) {
            const userByPhone = await this.usersService.getByPhone(userDto.phone);  
            
            if (userByPhone)
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user = await this.usersService.createUser(userDto);

        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {id: user.id, email: user.email, phone: user.phone};

        return {
            token: this.jwtService.sign(payload)
        };
    }

    private async validateUser(loginDto: AuthUserDto) {
        const user = await this.usersService.getByEmailOrPhone(loginDto);
        const passwordEquals = await bcrypt.compare(loginDto.password, user.password);

        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({message: 'Wrong email or phone'});
    }
}
