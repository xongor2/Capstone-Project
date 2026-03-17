const { z } = require('zod');

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['user', 'admin']).optional()
});

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

const transactionSchema = z.object({
    title: z.string().min(2, 'Title is required'),
    amount: z.number().refine(val => val !== 0, { message: 'Amount cannot be zero' }),
    type: z.enum(['income', 'expense']),
    category: z.string().min(1, 'Category is required'),
    date: z.string().optional()
});

module.exports = {
    registerSchema,
    loginSchema,
    transactionSchema,
};
