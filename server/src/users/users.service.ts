import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {AuthUserDto} from "./dto/auth-user.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private jwtService: JwtService
    ) {}

    async createUser(dto: CreateUserDto) {
        try {
            //hashing password
            const hash = await bcrypt.hash(dto.password, 3);

            const user = await this.userRepository.create({
                email: dto.email,
                password: hash,
                username: dto.username
            });
            const payload = user['dataValues']

            return this.jwtService.sign(payload)
        } catch (e) {
            return e.message
        }
    }

    async authUser(dto: AuthUserDto) {
        try {
            const user = await this.userRepository.findOne({where: {email: dto.email}})
            const userHashedPassword = user['dataValues'].password;
            const isMatch = await bcrypt.compare(dto.password, userHashedPassword);
            if (isMatch) {
                const payload = user['dataValues']
                return this.jwtService.sign(payload)
            } else throw new Error('Wrong password!')
        } catch (e) {
            return e.message
        }
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll()
        return users
    }
}
