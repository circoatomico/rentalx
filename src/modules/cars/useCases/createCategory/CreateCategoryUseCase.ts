import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppErrors";

interface IRequest {
    name: string;
    description: string;
}

/**
 * 
 * [] - Definir tipo de retorno
 * [] - Alterar o retorno de erro
 * [] - Acessar o repositório
 * [] - Retornar algo
 */

@injectable()
class CreateCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({description, name}: IRequest): Promise<void> {

        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new AppError("Category already exists!", 404);
        }

        this.categoriesRepository.create({name, description});

    }

}

export { CreateCategoryUseCase }