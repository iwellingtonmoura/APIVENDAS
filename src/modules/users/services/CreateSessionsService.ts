import AppError from "@shared/errors/appError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import Autorizacao from '@config/Autorizacao';
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest{

    email: string;
    password: string;
}

interface IResponse

    { user: User; token: string; }


class CreateSessionsService{

    public async execute({ email, password}: IRequest) : Promise<IResponse>{

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmnail(email);

    if(!user){

        throw new AppError('Usuário ou Senha Incorrreta', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if(!passwordConfirmed){

        throw new AppError('Usuário ou Senha Incorrreta', 401);
    }

    const token = sign({}, Autorizacao.jwt.secret,{

        subject: user.id,
        expiresIn: Autorizacao.jwt.expiresIn,
    } );

    return {
            user,
            token,
            };


    }
}

export default CreateSessionsService;
