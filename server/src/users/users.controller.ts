import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {AuthUserDto} from "./dto/auth-user.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @Post('/login')
    login(@Body() userDto: AuthUserDto) {
        return this.usersService.authUser(userDto)
    }
}
