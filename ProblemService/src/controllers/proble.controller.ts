import {  Request, Response } from 'express';
import {  ProblemService } from '../service/problem.service';
import { ProblemRepository } from '../repository/problem.repository';
export interface IProblemController {
    getProblems: (req: Request, res: Response) => Promise<void>;
    getProblemById: (req: Request, res: Response) => Promise<void>;
    createProblem: (req: Request, res: Response) => Promise<void>;
    updateProblem: (req: Request, res: Response) => Promise<void>;
    deleteProblem: (req: Request, res: Response) => Promise<void>;
    findProblemsByDifficulty: (req: Request, res: Response) => Promise<void>;
    searchProblems: (req: Request, res: Response) => Promise<void>;
}

const problemRepository = new ProblemRepository();
const problemService = new ProblemService(problemRepository);
export const ProblemController =  {

    async createProblem(req:Request, res: Response): Promise<void>{

        const problem =  problemService.createProblem(req.body);     
        res.status(201).json({
            message: "Problem Created Successfully",
            data: problem,
            success: true
        })   
    },

    async deleteProblem(req: Request, res: Response): Promise<void> {
        await problemService.deleteProblem(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Problem deleted successfully'
        });
    },

    async findProblemsByDifficulty(req: Request, res: Response): Promise<void> {
        const { difficulty } = req.query;
        const problems = await problemService.findProblemsByDifficulty(difficulty as "Easy" | "Medium" | "Hard");
        res.status(200).json({
            success: true,
            data: problems,
            message: 'Problems fetched successfully'
        });
    },

    async searchProblems(req: Request, res: Response): Promise<void> {
        const { query } = req.query;
        const problems = await problemService.searchProblems(query as string);
        res.status(200).json({
            success: true,
            data: problems,
            message: 'Problems fetched successfully'
        });
    },
    async getProblemById(req: Request, res: Response): Promise<void> {
        const problem = await problemService.getProblemById(req.params.id);
        res.status(200).json({
            success: true,
            data: problem,
            message: 'Problem fetched successfully'
        });
    },
    async getProblems(req: Request, res: Response): Promise<void> {
        const problems = await problemService.getProblems();
        res.status(200).json({
            success: true,
            data: problems,
            message: 'Problems fetched successfully'
        });
    },
    async updateProblem(req: Request, res: Response): Promise<void> {
        const problem = await problemService.updateProblem(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: problem,
            message: 'Problem updated successfully'
        });
    }

    
}