import { getCustomRepository } from "typeorm";
import Produtcs from "../typeorm/entities/product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

class ListProductService{

    public async execute() : Promise<Produtcs[]>{
        const productRepository = getCustomRepository(ProductRepository);

        const products  = await productRepository.find();

        return products;

    }
}

export default ListProductService;
