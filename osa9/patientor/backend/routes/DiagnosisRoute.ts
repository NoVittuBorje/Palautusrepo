import { Router,Response } from 'express';

import { getAllDiagnoses } from '../services/DiagnosesService';
import { Diagnosis } from '../types';
import cors from 'cors';
export const DiagnosesRouter = Router();
DiagnosesRouter.use(cors());

DiagnosesRouter.get('/',(_req,res:Response<Diagnosis[]>) => {
    const result = getAllDiagnoses();
    res.send(result);
  });