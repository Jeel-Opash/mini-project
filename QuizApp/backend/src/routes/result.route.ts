import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { createResult, listResults } from '../controller/result.controller.js';

const resultRouter = express.Router();

resultRouter.post('/', authMiddleware, createResult)
resultRouter.get('/', authMiddleware, listResults)

export default resultRouter