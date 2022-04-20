import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ProductsController from "../controllers/ProductsController";


const productsRouter = Router();
const productscontroller =  new ProductsController();

productsRouter.get('/', productscontroller.index);

productsRouter.get(

    '/:id',

    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }

    }),

    productscontroller.show);

productsRouter.post(

    '/',

    celebrate({

        [Segments.BODY]: {

            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),

        },


    }),

    productscontroller.create);

productsRouter.put(

    '/:id',

    celebrate(
    {

        [Segments.BODY]:
        {

            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        },

        [Segments.PARAMS]:
        {
            id: Joi.string().uuid().required(),
        },
    }),

    productscontroller.update
    );

productsRouter.delete(

    '/:id',

    celebrate(

    {
        [Segments.PARAMS]:
        {
            id: Joi.string().uuid().required(),
        }

    }),

    productscontroller.delete);

export default productsRouter;
