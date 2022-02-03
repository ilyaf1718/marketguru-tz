import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { AuthUserDto } from 'src/auth/dto/authUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
    constructor (@InjectModel(User) private userRepository: typeof User) {}

    async getAll(req) {

        const pageSize = req.size || 10;
        const page =  req.page || 1;

        const email = req.email || null;
        const phone = req.phone || null;

        const emailClause = {
            email: {[Op.like]: `%${email}%`}
        };

        const phoneClause = {
            phone: {[Op.like]: `%${phone}%`}
        };

        let finalClause = {};

        if (email) finalClause = Object.assign(finalClause, emailClause);
        if (phone) finalClause = Object.assign(finalClause, phoneClause);

        return await this.userRepository.findAll({
            where: finalClause,
            limit: pageSize,
            offset: (page - 1) * pageSize
        });
    }

    async createUser (dto: CreateUserDto) {
        try {
            return await this.userRepository.create(dto);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
        
        
    }


    async getByEmail(email: string) {
        const user = this.userRepository.findOne({where: {email}});

        return user;
    }

    async getByPhone(phone: string) {
        const user = this.userRepository.findOne({where: {phone}});

        return user;
    }

    async getByEmailOrPhone(loginDto: AuthUserDto) {

        const searchValue = loginDto.emailOrPhone;

        if (searchValue.includes("@"))
        {
            return await this.getByEmail(searchValue);
        }
        else
        {
            return await this.getByPhone(searchValue);
        }
    }

    async update(authUser, userDto: UpdateUserDto) {
        const user = await this.userRepository.findByPk(authUser.id);

        return await user.update(userDto);
    }

    async delete(id: number) {
        const user = await this.userRepository.findByPk(id);
        await user.destroy();
    }
}
