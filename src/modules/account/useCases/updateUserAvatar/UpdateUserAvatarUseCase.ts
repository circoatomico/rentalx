import { inject, injectable } from "tsyringe"
import { isConstructorDeclaration } from "typescript"

interface IRequest {
    user_id: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({user_id, avatar_file}: IRequest): Promise<void> {        
        
        const user = await this.usersRepository.findById(user_id);

        user.avatar = avatar_file;

        await this.usersRepository.create(user);

        // Adicionar coluna avatar na tabela de users
        // REfatorar usuario com coluna avatar
        // Configuração upload multer
        // Criar regra de negocio do upload
        // Criar Controller


    }

}

export {UpdateUserAvatarUseCase}