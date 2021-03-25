import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiResponse } from "api/api.response";
import { AddAdministratorDto } from "dto/add.administrator.dto";
import { EditAdministratorDto } from "dto/edit.administrator.dto";
import { Administrator } from "entities/administrator.entity";
import { AdministratorService } from "src/services/administrator.service";

@Controller('api/administrator')

export class AdministratorController {
    constructor (private administratorService: AdministratorService) {}

    @Get(':id')
    getAdmin(@Param('id') id: number) :Promise <Administrator> {
      return this.administratorService.getById(id);
    }
  
    @Get()
    getAllAdmin():Promise <Administrator[]> {
      return this.administratorService.getAllAdministrator();
    }
  
    @Put()
    add(@Body() data: AddAdministratorDto):Promise <Administrator | ApiResponse> {
      return this.administratorService.add(data);
    }
  
    @Post(':id')
    editAdmin(@Param('id') id: number, @Body() data: EditAdministratorDto):Promise <Administrator | ApiResponse> {
      return this.administratorService.edit(id, data);
    }
}