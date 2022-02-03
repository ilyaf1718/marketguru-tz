import { ApiProperty } from "@nestjs/swagger";
import { BeforeCreate, BeforeUpdate, Column, DataType, Model, Table } from "sequelize-typescript";
import * as bcrypt from 'bcryptjs';

@Table({
    tableName: "users",
    validate: {
        checkIsExistsEmailOrPhone() {
            if (!this.email && !this.phone)
                throw new Error("User must have email or phone!");
        }
    }
})
export class User extends Model<User> {

    @ApiProperty({example: '1', description: 'User identification number'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'e@mail.com', description: 'E-mail adress of user'})
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    email: string;

    @ApiProperty({example: '8-800-555-35-35', description: 'Phone number of user (RU)'})
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    phone: string;

    @ApiProperty({example: '123hOp_5', description: 'Password'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    password: string;

    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(user: User) {

        if (user.password)
        user.password = await bcrypt.hash(user.password, 8);
    }
}