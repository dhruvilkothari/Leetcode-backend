
import { submissionQueue } from "../queues/submission.queue";
import logger from "../config/logger.config";
import { IProblemDetails } from "../apis/problem.apis";
import { SubmissionLanguage } from "../models/subbmission.model";
import { QueueConstants } from "../constants/queue.constants";


export interface ISubmissionJob {
    submissionId: string;
    problem: IProblemDetails;
    code: string;
    language: SubmissionLanguage;
}

export async function addSubmissionJob(data: ISubmissionJob) : Promise<string | null>{
    try {
        const job = await submissionQueue.add(QueueConstants.EVALUATE_SUBMISSION, data);

        logger.info(`Submission job added: ${job.id}`);

        return job.id || null;
    } catch(error) {
        logger.error(`Failed to add submission job: ${error}`);
        return null;
    }
}