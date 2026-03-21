import {ItestCase} from '../models/problem.model';
export interface ICreateProblemDTO {
    title: string;
    description: string;
    difficulty: "Easy" | "Medium" | "Hard";
    editorial?: string;
    testCases: ItestCase[];
}

export interface IUpdateProblemDTO {
    title?: string;
    description?: string;
    difficulty?: "Easy" | "Medium" | "Hard";
    editorial?: string;
    testCases?: ItestCase[];
}

