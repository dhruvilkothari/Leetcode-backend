import express from 'express';
import { validateRequestBody } from '../../validators';

import { createProblemDto } from '../../validators/problem.validator';
import { ProblemRepository } from '../../repository/problem.repository';
import { ProblemService } from '../../service/problem.service';
import { ProblemController } from '../../controllers/proble.controller';


const problemRepository = new ProblemRepository(); // You should implement this
const problemService = new ProblemService(problemRepository); // You should implement this
const problemController = new ProblemController(problemService); // You should implement this

const problemRouter = express.Router();

problemRouter.post('/', validateRequestBody(createProblemDto), problemController.cr); // TODO: Resolve this TS compilation issue

problemRouter.get('/:id', problemController.getProblemById);






export default problemRouter;