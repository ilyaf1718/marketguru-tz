import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthUser } from './user.decorator';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor (private usersService: UsersService) {}

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Query() req) {
        return this.usersService.getAll(req);
    }

    @ApiOperation({summary: 'User creation'})
    @ApiResponse({status:200, type: User})
    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Update data of authenticated user'})
    @ApiResponse({status:200, type: User})
    @UseGuards(JwtAuthGuard)
    @Post('updateSelf')
    updateSelf(@AuthUser() authUser, @Body() userDto: UpdateUserDto) {
        return this.usersService.update(authUser, userDto);
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiResponse({status:200})
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.usersService.delete(id);
    }


}
