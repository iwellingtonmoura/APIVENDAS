
import productsRouter from "@modules/products/routes/products.routers";
import sessionRouter from "@modules/users/routes/sessions.routes";
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionRouter)

// routes.get('/', (request, response) => {
// return response.json({message: 'Hello Dev!'});
// });

export default routes;
