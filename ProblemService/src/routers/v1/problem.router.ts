import express from 'express';
import { validateRequestBody, validateRequestParams } from '../../validators';

import { createProblemDto, findByDifficulty, updateProblemDto } from '../../validators/problem.validator';
import { ProblemController } from '../../controllers/proble.controller';

const problemRouter = express.Router();

problemRouter.post('/', validateRequestBody(createProblemDto), ProblemController.createProblem); // TODO: Resolve this TS compilation issue

problemRouter.get('/:id', ProblemController.getProblemById);


problemRouter.get('/', ProblemController.getProblems);

problemRouter.put('/:id', validateRequestBody(updateProblemDto), ProblemController.updateProblem);

problemRouter.delete('/:id', ProblemController.deleteProblem);

problemRouter.get('/diffculty/:diffculty',validateRequestParams(findByDifficulty), ProblemController.findProblemsByDifficulty);

problemRouter.get('/search', ProblemController.searchProblems);




export default problemRouter;