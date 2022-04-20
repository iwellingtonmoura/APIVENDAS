import AppError from "@shared/errors/appError";
import path from "path";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest{

    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService{

    public async execute({user_id, avatarFilename}: IRequest) : Promise<User>{

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if(!user){
        throw new AppError('User Not Found.');
    }

    if(user.avatar){

        const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

        if (userAvatarFileExists){

            await fs.promises.unlink(userAvatarFilePath)
        }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;

}

}
export default UpdateUserAvatarService;
