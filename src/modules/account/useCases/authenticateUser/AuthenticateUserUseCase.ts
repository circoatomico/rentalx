import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { AppError } from "../../../../errors/AppErrors";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    };
    token: string
}

@injectable()
class AuthenticateUserUseCase {

    constructor (
        @inject("UsersRepository")
        private usersRepository: IUsersRepository

    ) {}

    async execute ({email, password}: IRequest): Promise<IResponse> {

        // usuario existe
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("email or password incorrect!", 401);
        }

        // Senha está correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new AppError("email or password incorrect!", 401);
        }

        // Gerar JsonWebToken
        const token = sign({}, "25bc1ddd231110efb1d064bcf0439533", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase }