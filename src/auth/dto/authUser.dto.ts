import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthUserDto {
    @ApiProperty({example: 'e@mail.com OR 8-800-555-35-35', description: 'E-mail adress or phone of a user'})
    @IsNotEmpty()
    readonly emailOrPhone: string;

    @ApiProperty({example: '15gH%06L4', description: 'Password'})
    @IsNotEmpty()
    readonly password: string;
}