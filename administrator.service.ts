import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddAdministratorDto } from "dto/add.administrator.dto";
import { Administrator } from "entities/administrator.entity";
import { Repository } from "typeorm";
import * as crypto from "crypto"
import { ApiResponse } from "api/api.response";
import { EditAdministratorDto } from "dto/edit.administrator.dto";

@Injectable()

export class AdministratorService {
    constructor(@InjectRepository(Administrator) private readonly administrator: Repository<Administrator>) {}

    getById(id: number):Promise <Administrator> {
        return this.administrator.findOne(id);
    }

    getAllAdministrator():Promise <Administrator[]> {
        return this.administrator.find();
    }

    async getByUsername(username: string):Promise <Administrator | null> {
        const admin = await this.administrator.findOne({
            username : username
        });

        if(admin) {
            return admin
        }
        return null
    }

    add(data: AddAdministratorDto) :Promise<Administrator | ApiResponse> {

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password)
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        let newAdmin: Administrator = new Administrator();
        newAdmin.passwordHash = passwordHashString;
        newAdmin.username = data.username;

        return new Promise ((resolve) => {
            this.administrator.save(newAdmin)
            .then(data => {
                resolve(data)
            }).catch(error => {
                const response: ApiResponse = new ApiResponse('error', -1001, 'Administrator vec postoji')
                resolve(response);
            })
        })
    }

    async edit(id: number, data : EditAdministratorDto):Promise <Administrator | ApiResponse> {
        let newAdmin = await this.administrator.findOne(id);

        if (newAdmin === undefined) {
            return new ApiResponse('error', -1002, 'Administrator ne postoji')
        }
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password)
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if (newAdmin.passwordHash === passwordHashString) {
            return new ApiResponse('error', -1003, 'Doslo je do greske')
        }
        newAdmin.passwordHash = passwordHashString;

        return new Promise ((resolve) => {
            this.administrator.save(newAdmin)
            .then(data => {resolve(data)})
            .catch(error => {resolve(new ApiResponse('error', -1004, 'Doslo je do neke greske'))})
        })
    }
}