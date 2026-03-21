import mongoose from "mongoose";
import { Document } from "mongoose";


export interface ItestCase extends Document {
    input: string;
    output: string;
}

export interface IProblem extends Document {

    title: string;
    description: string;
    difficulty: "Easy" | "Medium" | "Hard";
    editorial?: string;
    testCases: ItestCase[];
    createdAt: Date;
    updatedAt: Date;
}

const arrayLimit = (val: ItestCase[]) => val.length > 0;

const testCaseSchema = new mongoose.Schema<ItestCase>({
    input: { type: String, required: [true, "Input is Required"] },
    output: { type: String, required: [true, "Output is Required"] }
}, 
// { _id: false }   
);

const problemSchema = new mongoose.Schema<IProblem>({
    title: { type: String, required: [true, "Title is Required"], maxlength: [100, "Title cannot exceed 100 characters"], trim: true },
    description: { type: String, required: [true, "Description is Required"], trim: true },
    difficulty: { type: String, enum: {values: ["Easy", "Medium", "Hard"], message: "{VALUE} is not a valid difficulty level"}, required: [true, "Difficulty is Required"] },
    editorial: { type: String, trim: true },
    testCases: [testCaseSchema, { validate: [arrayLimit, "At least one test case is required"] }]
}, { timestamps: true });

problemSchema.index({ title: 1 }, { unique: true });
problemSchema.index({ difficulty: 1 });

export const Problem = mongoose.model<IProblem>("Problem", problemSchema);



