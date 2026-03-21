import {  Request, Response } from 'express';
import { IProblemService } from '../service/problem.service';
export interface IProblemController {
    getProblems: (req: Request, res: Response) => Promise<void>;
    getProblemById: (req: Request, res: Response) => Promise<void>;
    createProblem: (req: Request, res: Response) => Promise<void>;
    updateProblem: (req: Request, res: Response) => Promise<void>;
    deleteProblem: (req: Request, res: Response) => Promise<void>;
    findProblemsByDifficulty: (req: Request, res: Response) => Promise<void>;
    searchProblems: (req: Request, res: Response) => Promise<void>;
}

export class ProblemController implements IProblemController {
    private problemService: IProblemService;
    constructor(problemService: IProblemService) {
        this.problemService = problemService;
    }

    async createProblem(req:Request, res: Response): Promise<void>{

        const problem =  this.problemService.createProblem(req.body);     
        res.status(201).json({
            message: "Problem Created Successfully",
            data: problem,
            success: true
        })   
    }

    async deleteProblem(req: Request, res: Response): Promise<void> {
        await this.problemService.deleteProblem(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Problem deleted successfully'
        });
    }

    async findProblemsByDifficulty(req: Request, res: Response): Promise<void> {
        const { difficulty } = req.query;
        const problems = await this.problemService.findProblemsByDifficulty(difficulty as string);
        res.status(200).json({
            success: true,
            data: problems,
            message: 'Problems fetched successfully'
        });
    }

    async searchProblems(req: Request, res: Response): Promise<void> {
        const { query } = req.query;
        const problems = await this.problemService.searchProblems(query as string);
        res.status(200).json({
            success: true,
            data: problems,
            message: 'Problems fetched successfully'
        });
    }
    async getProblemById(req: Request, res: Response): Promise<void> {
        const problem = await this.problemService.getProblemById(req.params.id);
        res.status(200).json({
            success: true,
            data: problem,
            message: 'Problem fetched successfully'
        });
    }
    async getProblems(req: Request, res: Response): Promise<void> {
        const problems = await this.problemService.getProblems();
        res.status(200).json({
            success: true,
            data: problems,
            message: 'Problems fetched successfully'
        });
    }
    async updateProblem(req: Request, res: Response): Promise<void> {
        const problem = await this.problemService.updateProblem(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: problem,
            message: 'Problem updated successfully'
        });
    }

    
}