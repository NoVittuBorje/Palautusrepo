import { Router,Response } from 'express';

import { getAllDiagnoses } from '../services/DiagnosesService';
import { Diagnosis } from '../types';
import cors from 'cors';
export const DiagnosesRouter = Router();
DiagnosesRouter.use(cors());

DiagnosesRouter.get('/',(_req,res:Response<Diagnosis[]>) => {
    console.log("diagnoses");
    const result = getAllDiagnoses();
    console.log(result);
    res.send(result);
  });