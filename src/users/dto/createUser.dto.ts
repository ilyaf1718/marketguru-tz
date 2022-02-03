import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'e@mail.com', description: 'E-mail adress of user'})
    @IsOptional()
    @IsEmail()
    readonly email: string;

    @ApiProperty({example: '8-800-555-35-35', description: 'Phone number of user (RU)'})
    @IsOptional()
    @IsPhoneNumber('RU')
    readonly phone: string;

    @ApiProperty({example: '123hOp_5', description: 'Password'})
    @IsString()
    @MinLength(8)
    readonly password: string;
}