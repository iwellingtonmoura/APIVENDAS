import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UserController';
import isAutenthicated from '../../../shared/http/middlewares/IsAuthtenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter =  Router();
const usersController =  new UsersController();
const usersAvatarController =  new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAutenthicated, usersController.index);

usersRouter.post(

    '/',
    celebrate({
        [Segments.BODY]: {

            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string(). required(),
        },

    }),

    usersController.create,
);

    usersRouter.patch(
        '/avatar',
        isAutenthicated,
        upload.single('avatar'),
        usersAvatarController.update,

);

export default usersRouter;
