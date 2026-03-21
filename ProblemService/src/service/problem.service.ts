import { ICreateProblemDTO, IUpdateProblemDTO } from "../dtos/problem.dto";
import { IProblem } from "../models/problem.model";
import { IProblemRepository } from "../repository/problem.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { sanitizeMarkdown } from "../utils/markdown.sanitize";

export interface IProblemService {
    createProblem(problem: ICreateProblemDTO): Promise<IProblem>;
    getProblemById(id: string): Promise<IProblem | null>;
    getProblems(options?: { skip?: number; limit?: number }): Promise<{problems:IProblem[], total: number}>;
    updateProblem(id: string, updateData: IUpdateProblemDTO): Promise<IProblem | null>;
    deleteProblem(id: string): Promise<void>;
    findProblemsByDifficulty(difficulty: "Easy" | "Medium" | "Hard", options: { skip?: number; limit?: number }): Promise<IProblem[]>;
    searchProblems(query: string, options: { skip?: number; limit?: number }): Promise<IProblem[]>;
}

export class ProblemService implements IProblemService {
    private  problemRepository: IProblemRepository;
    constructor(problemRepository: IProblemRepository) {
        this.problemRepository = problemRepository;
    }

    async createProblem(problem: ICreateProblemDTO): Promise<IProblem> {
        //sanitize and validate input here if needed

        const santizedPayload: ICreateProblemDTO = {
            ...problem,
            description: await sanitizeMarkdown(problem.description),
            editorial: problem.editorial ? await sanitizeMarkdown(problem.editorial) : undefined
        };

        return await this.problemRepository.createProblem(santizedPayload as IProblem);
    }

    async getProblemById(id: string): Promise<IProblem | null> {
        const problem: IProblem | null =  await this.problemRepository.getProblemById(id);
        if(!problem) {
            throw new NotFoundError(`Problem with id ${id} not found`);
        }
        return problem;
    }

    async getProblems(options?: { skip?: number; limit?: number }): Promise<{problems:IProblem[], total: number}> {
        return await this.problemRepository.getProblems(options);
    }

    async updateProblem(id: string, updateData: IUpdateProblemDTO): Promise<IProblem | null> {
        const problem: IProblem | null = await this.problemRepository.getProblemById(id);
        if(!problem) {
            throw new NotFoundError(`Problem with id ${id} not found`);
        }
        const santizedPayload: IProblem = {
            ...updateData,
            title: updateData.title ? updateData.title.trim() : problem.title,
            description: updateData.description ? await sanitizeMarkdown(updateData.description) : problem.description,
            editorial: updateData.editorial ? await sanitizeMarkdown(updateData.editorial) : problem.editorial
        } as IProblem;
        const updatedProblem = await this.problemRepository.updateProblem(id, santizedPayload);
        return updatedProblem;
    }

    async deleteProblem(id: string): Promise<void> {
        const problem: IProblem | null = await this.problemRepository.getProblemById(id);
        if(!problem) {
            throw new NotFoundError(`Problem with id ${id} not found`);
        }
        return await this.problemRepository.deleteProblem(id);
    }

    async findProblemsByDifficulty(difficulty: "Easy" | "Medium" | "Hard", options: { skip?: number; limit?: number }): Promise<IProblem[]> {
        return await this.problemRepository.findProblemsByDifficulty(difficulty, options);
    }

    async searchProblems(query: string, options: { skip?: number; limit?: number }): Promise<IProblem[]> {
        if(!query || query.trim() === "") {
            throw new BadRequestError("Search query cannot be empty");
        }
        return await this.problemRepository.searchProblems(query, options);
    }

}