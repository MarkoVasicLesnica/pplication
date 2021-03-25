import { Body, Controller, Post } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { ApiResponse } from "api/api.response";
import { AddArticleDto } from "dto/add.article.dto";
import { Article } from "entities/article.entity";
import { ArticleService } from "src/services/article.service";

@Controller('api/article')
@Crud({
    model : {
        type : Article
    },
    params : {
        id : {
            field : 'articleId',
            type : 'number',
            primary : true
        }
    }
})
export class ArticleController {
    constructor (public service: ArticleService) {}

    @Post('createArticle')
    creadteFullArticle(@Body() data: AddArticleDto):Promise <Article | ApiResponse> {
        return this.service.ceaterFullArticle(data);
    }
}