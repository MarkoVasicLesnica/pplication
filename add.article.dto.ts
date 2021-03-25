export class AddArticleDto {
    name: string;
    categoriId : number;
    except: string;
    description: string;
    price: number;
    feature: {
        featureId: number;
        value: string;
    }[]

}