import AppError from "@shared/errors/appError";
import { getCustomRepository } from "typeorm";
import Produtcs from "../typeorm/entities/product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest{
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService{

    public async execute({id, name, price, quantity}: IRequest) : Promise<Produtcs>{
        const productRepository = getCustomRepository(ProductRepository);

        const product  = await productRepository.findOne(id);

        if(!product){

            throw new AppError('Produto não Encontrado');
        }

        const productExists = await productRepository.findbyname(name);

        if(productExists && name !== product.name){

            throw new AppError("Produto não encontrado")
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productRepository.save(product);

        return product;

    }
}

export default UpdateProductService;
