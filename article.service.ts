import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ApiResponse } from "api/api.response";
import { AddArticleDto } from "dto/add.article.dto";
import { Article } from "entities/article.entity";
import { ArticleFeature } from "entities/articlefeature.entity";
import { ArticlePrice } from "entities/articleprice.entity";
import { Repository } from "typeorm";

@Injectable()
export class ArticleService extends TypeOrmCrudService <Article> {
    constructor (@InjectRepository(Article) private readonly service: Repository<Article>,
                 @InjectRepository(ArticlePrice) private  readonly articlePrice : Repository<ArticlePrice>,
                 @InjectRepository(ArticleFeature) private readonly articleFeature: Repository<ArticleFeature>
    ) {
        super(service)
    }
    
    async ceaterFullArticle(data :AddArticleDto):Promise <Article | ApiResponse> {
        let newArticle = new Article();
        newArticle.name = data.name;
        newArticle.categoryId = data.categoriId;
        newArticle.except = data.except;
        newArticle.description = data.description;

        let savedArticle :Article = await this.service.save(newArticle)

        let newAtriclePrice : ArticlePrice = new ArticlePrice();
        newAtriclePrice.articleId = savedArticle.articleId;
        newAtriclePrice.price = data.price;

        await this.articlePrice.save(newAtriclePrice);

        for (let feature of data.feature) {

            let newArticleFeature :ArticleFeature = new ArticleFeature();
            newArticleFeature.articleId = savedArticle.articleId;
            newArticleFeature.featureId = feature.featureId;
            newArticleFeature.value = feature.value;

            await this.articleFeature.save(newArticleFeature);
        }

        return this.service.findOne(savedArticle.articleId, {
            relations : ["articleFeatures", "articlePrices"]
        })
    }
}