import mongoose, { Document } from "mongoose";

export enum SubmissionStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    WRONG_ANSWER = "WRONG_ANSWER",
    RUNTIME_ERROR = "RUNTIME_ERROR",
    TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED"
}

export enum Language {
  CPP = "cpp",
  PYTHON = "python",
  JAVA = "java",
  JAVASCRIPT = "javascript",
  TYPESCRIPT = "typescript"
}
export interface ISubmission extends Document {
    problemId: string;
    code: string;
    language: Language;
    status: SubmissionStatus;
    createdAt: Date;
    updatedAt: Date; 
}

const submissionSchema = new mongoose.Schema<ISubmission>(
  {
    problemId: {
      type: String,
      required: [true, "Problem Id Is Required"],
    },
    code: {
      type: String,
      required: [true, "Code is Required"],
    },
    language: {
      type: String,
      required: [true, "Language is Required"],
      enum: Object.values(Language)
    },
    status: {
      type: String,
      enum: Object.values(SubmissionStatus),
      default: SubmissionStatus.PENDING,
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

submissionSchema.index({ problemId: 1, createdAt: -1 });


export const Submission = mongoose.model<ISubmission>(
  "Submission",
  submissionSchema
);