 import {EntityRepository, Repository} from 'typeorm';
 import products from '../entities/product';

 @EntityRepository(products)
 export class ProductRepository extends Repository<products>{

    public async findbyname(name : string): Promise<products | undefined>{

        const product = this.findOne({

            where: {

                name,
            }
        });

        return product;
    }
 }
