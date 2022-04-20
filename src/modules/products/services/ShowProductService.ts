import AppError from "@shared/errors/appError";
import { getCustomRepository } from "typeorm";
import Produtcs from "../typeorm/entities/product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest{
    id: string;
}

class ShowProductService{

    public async execute({id}: IRequest) : Promise<Produtcs>{
        const productRepository = getCustomRepository(ProductRepository);

        const product  = await productRepository.findOne(id);

        if(!product){

            throw new AppError('Produto não Encontrado');
        }

        return product;

    }
}

export default ShowProductService;
