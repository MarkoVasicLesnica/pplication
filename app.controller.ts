import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from 'api/api.response';
import { AddAdministratorDto } from 'dto/add.administrator.dto';
import { EditAdministratorDto } from 'dto/edit.administrator.dto';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from '../services/administrator.service';

@Controller()
export class AppController {
  

 
}
