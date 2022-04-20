import AppError from "@shared/errors/appError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest{

    name: string;
    email: string;
    password: string;
}

class CreateUserService{

    public async execute({name, email, password}: IRequest) : Promise<User>{

    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);
    if(emailExists){

        throw new AppError('Email já existente na base de dados');
    }

    const SenhaCripto =  await hash(password, 8);



    const user = usersRepository.create({
        name,
        email,
        password: SenhaCripto,
    });

    await usersRepository.save(user);

    return user;


    }
}

export default CreateUserService;
