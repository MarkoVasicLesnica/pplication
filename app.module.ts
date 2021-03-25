import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'config/database.config';
import { Administrator } from 'entities/administrator.entity';
import { Article } from 'entities/article.entity';
import { ArticleFeature } from 'entities/articlefeature.entity';
import { ArticlePrice } from 'entities/articleprice.entity';
import { Cart } from 'entities/cart.entity';
import { CartArticle } from 'entities/cartarticle.entity';
import { Category } from 'entities/category.entity';
import { Feature } from 'entities/feature.entity';
import { Order } from 'entities/order.entity';
import { Photo } from 'entities/photo.entity';
import { User } from 'entities/user.entity';
import { AdministratorController } from './controller/administrator.controller';
import { AppController } from './controller/app.controller';
import { ArticleController } from './controller/article.controller';
import { AdministratorService } from './services/administrator.service';
import { ArticleService } from './services/article.service';
import { CategoryService } from './services/category.service';
import { CategoryController } from "src/controller/category.controller"
import { AuthController } from './controller/auth.controller';
import { AuthMiddleware } from './middlewers/auth.middlewear';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type : 'mysql',
      username : DatabaseConfig.username,
      password : DatabaseConfig.password,
      port : 3306,
      database : DatabaseConfig.database,
      entities : [
        Administrator, Article, ArticleFeature, ArticlePrice, Cart, CartArticle, Category, Feature, Order, Photo, User
      ]
    }),
    TypeOrmModule.forFeature([Administrator, Article, Category, ArticlePrice, ArticleFeature])
  ],
  controllers: [AppController, AdministratorController, ArticleController, CategoryController, AuthController],
  providers: [AdministratorService, ArticleService, CategoryService],
  exports : [AdministratorService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth/*').forRoutes('api/*')
  }
  
}
