import { IProblem, Problem } from "../models/problem.model";

export interface IProblemRepository {
    createProblem(problem: IProblem): Promise<IProblem>;
    getProblemById(id: string): Promise<IProblem | null>;
    getProblems(options?: { skip?: number; limit?: number }): Promise<{problems:IProblem[], total: number}>;
    updateProblem(id: string, updateData: Partial<IProblem>): Promise<IProblem | null>;
    deleteProblem(id: string): Promise<void>;
    findProblemsByDifficulty(difficulty: "Easy" | "Medium" | "Hard", options: { skip?: number; limit?: number }): Promise<IProblem[]>;
    searchProblems(query: string, options: { skip?: number; limit?: number }): Promise<IProblem[]>;
}

// Mock database


export class ProblemRepository implements IProblemRepository {
    async createProblem(problem: IProblem): Promise<IProblem> {
        const newProblem = new Problem(problem);
        return await newProblem.save();
        
    }

    async getProblemById(id: string): Promise<IProblem | null> {
        return await Problem.findById(id);
    }

    async getProblems(options?: { skip?: number; limit?: number }): Promise<{problems:IProblem[], total: number}> {
        const problems = await Problem.find().skip(options?.skip || 0).limit(options?.limit || 10);
        const total = await Problem.countDocuments();
        return { problems, total };
    }

    async updateProblem(id: string, updateData: Partial<IProblem>): Promise<IProblem | null> {
        return await Problem.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    }

    async deleteProblem(id: string): Promise<void> {
        const result = await Problem.findByIdAndDelete(id);
        return result!==null ? Promise.resolve() : Promise.reject(new Error("Problem not found"));
    }

    async findProblemsByDifficulty(difficulty: "Easy" | "Medium" | "Hard", options: { skip?: number; limit?: number }): Promise<IProblem[]> {
        return await Problem.find({ difficulty }).skip(options.skip || 0).limit(options.limit || 10);
    }

    async searchProblems(query: string, options: { skip?: number; limit?: number }): Promise<IProblem[]> {
        const regex = new RegExp(query, "i");
        return await Problem.find({ $or: [{ title: regex }, { description: regex }] }).skip(options.skip || 0).limit(options.limit || 10).sort({ createdAt: -1 });
    }
}

