import z from 'zod';
export const createProblemDto = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
    editorial: z.string().optional(),
    testCases: z.array(z.object({
        input: z.string().min(1, 'Test case input is required'),
        output: z.string().min(1, 'Test case output is required'),
    })).min(1, 'At least one test case is required'),
});

export const updateProblemDto = z.object({
    title: z.string().min(1, 'Title is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
    editorial: z.string().optional(),
    testCases: z.array(z.object({
        input: z.string().min(1, 'Test case input is required'),
        output: z.string().min(1, 'Test case output is required'),
    })).min(1, 'At least one test case is required').optional(),
});


export type CreateProblemDto = z.infer<typeof createProblemDto>;
export type UpdateProblemDto = z.infer<typeof updateProblemDto>;
