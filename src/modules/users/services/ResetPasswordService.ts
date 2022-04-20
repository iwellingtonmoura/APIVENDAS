import AppError from "@shared/errors/appError";
import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from "date-fns";
import { hash }from "bcryptjs";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";

interface IRequest {

    token: string;
    password: string;

}

class SendForgotPasswordService {

    public async execute({ token, password }: IRequest): Promise<void> {

        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UsersTokensRepository);

        const userToken = await userTokenRepository.findByToken(token);

        if (!userToken) {

            throw new AppError(' User Token does not exists!');
        }

        const user = await usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not existis!')
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = await addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {

            throw new AppError('Token Expired!');
        }


        user.password = await  hash( password, 8);
    }
}

export default SendForgotPasswordService;
