import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AdministratorService } from "src/services/administrator.service";
import * as jwt from "jsonwebtoken";
import { JwtDataAdministratorDto } from "dto/jwt.data.administrator.dto";
import { jwtSecret } from "config/jwt.secret";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly administratorService: AdministratorService) {}
    async use(req: Request, res: Response, next: NextFunction) {

        if (!req.headers.authorization) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED)
        }
        
        const token = req.headers.authorization;
        
        const jwtData: JwtDataAdministratorDto =  jwt.verify(token, jwtSecret);
        if (!jwtData) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED)
        }

        const ip = req.ip
        if (jwtData.ip !== ip.toString()) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED)
        }

        const us = req.headers["user-agent"]
        if (jwtData.ua !== us) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED)
        }

        const administrator = await this.administratorService.getById(jwtData.administratorId)
        if(!administrator) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED)
        }

        const trenutniTimestemp = new Date().getTime() / 1000;

        if(trenutniTimestemp >= jwtData.expire) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED)
        }

        next();
    }
    
}