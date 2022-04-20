import Autorizacao from "@config/Autorizacao";
import AppError from "@shared/errors/appError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload{

  iat: number;
  exp: number;
  sub: string;
}

export default function isAutenthicated(

    request: Request,
    response: Response,
    next: NextFunction,
): void {

    const authHeader = request.headers.authorization;

    if(!authHeader){

        throw new AppError('JWT Token não encontrado!');
    }

    //Bearer jdlfdjiuioaldfjadfkjueoyopoopip

    //Pegando apenas a parte do Token retornada no objeto através do Split.
    const [, token] = authHeader.split(' ');

    try{

        //Se o Token foi forneceido, chama o método Next para continuar com a autenticação.
         const decodedToken = verify(token, Autorizacao.jwt.secret);

         const {sub} = decodedToken as ITokenPayload;

         request.user = {

            id: sub,
         };

         return next();

    } catch{

            throw new AppError('Token fornecido inválido!');
    }

}
