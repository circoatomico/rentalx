import { NextFunction, Request } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppErrors";
import { UsersRepository } from "../modules/account/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    try {

        const authHeader = request.headers.authorization;

        if (!authHeader) { 
            throw new AppError("Token missing", 401);
        }
    
        // Bearer jklabsndjl ashnasd
        const [, token] = authHeader.split(" ");

        const { sub: user_id } = verify(token, "25bc1ddd231110efb1d064bcf0439533") as IPayload;

        const userRepository = new UsersRepository();
        const user = userRepository.findById(user_id)

        if(!user) {
            throw new AppError("User does not exists!", 401);
        } else {
            request.user = {
                id: user_id
            }
            next(); 
        } 

    } catch {
        throw new AppError("Invalid Token!", 401);
    }

}