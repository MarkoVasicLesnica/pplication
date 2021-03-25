import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiResponse } from "api/api.response";
import { LoginAdministratorDto } from "dto/login.administrator.dto";
import { AdministratorService } from "src/services/administrator.service";
import * as crypto from "crypto";
import { LoginIfoAdministratorDto } from "dto/login.ifo.administrator.dto";
import * as jwt from "jsonwebtoken";
import { JwtDataAdministratorDto } from "dto/jwt.data.administrator.dto";
import { Request } from "express";
import { jwtSecret } from "config/jwt.secret";

@Controller("auth")
export class AuthController {
    constructor(public administratorService: AdministratorService) {}

    @Post('login')
    async doLogin(@Body() data: LoginAdministratorDto, @Req() req: Request):Promise <LoginIfoAdministratorDto | ApiResponse> {
        let admin  = await this.administratorService.getByUsername(data.username)

        if (!admin) {
            return new ApiResponse('error', -1003, 'Username ne postoji')
        }
        let passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        let passwordString = passwordHash.digest('hex').toUpperCase();

        if (passwordString !== admin.passwordHash) {
            return new ApiResponse('error', -1004, 'Password ne postoji!')
        }

        const jwtData = new JwtDataAdministratorDto();
        jwtData.administratorId = admin.administratorId;
        jwtData.username = admin.username;

        let sada = new Date();
        sada.setDate(sada.getDate() + 14);
        const istekTimestamp = sada.getTime() / 1000;

        jwtData.expire = istekTimestamp;
        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];

        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret)

        const responseObject = new LoginIfoAdministratorDto(
            admin.administratorId, admin.username, token
        );

        return new Promise (resolve => resolve(responseObject))
    }
}