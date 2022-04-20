import AppError from "@shared/errors/appError";
import { getCustomRepository } from "typeorm";
import Products from "../typeorm/entities/product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest{

    name: string;
    price: number;
    quantity: number;
}

class CreateProductService{

    public async execute({name, price, quantity}: IRequest) : Promise<Products>{
        const productRepository = getCustomRepository(ProductRepository);
        const productExists = await productRepository.findbyname(name);

        if(productExists){

            throw new AppError("Produto já Cadastrado")
        }
        const product = productRepository.create({

            name,
            price,
            quantity
        })

        await productRepository.save(product);

        return product;


    }
}

export default CreateProductService;
