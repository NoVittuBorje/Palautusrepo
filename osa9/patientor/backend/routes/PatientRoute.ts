import { Router,Response } from 'express';
import { getnonSensitivePatients, getPatientByID } from '../services/PatientService';
import { Entry, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';
import { newPatientSchema} from '../utils/utils';
import { z } from 'zod';
import { addNewPatient } from '../services/PatientService';
import cors from 'cors';
export const PatientRouter = Router();
PatientRouter.use(cors());
PatientRouter.get('/', (_req,res:Response<NonSensitivePatient[]>) => {
    
    const result = getnonSensitivePatients();
    console.log(result);
    res.send(result);
});
PatientRouter.post('/',(req,res) => {
    const newid:string = uuid();
    try {
        const newEntry:Patient = newPatientSchema.parse(req.body) as Patient;
        console.log(newEntry);
        newEntry.id = newid;
        addNewPatient(newEntry);
        console.log(newEntry);
        res.json(newEntry);
    }catch (error: unknown) {
        if (error instanceof z.ZodError) {
          res.status(400).send({ error: error.issues });
        } else {
          res.status(400).send({ error: 'unknown error' });
        }
      }
});

PatientRouter.get('/:id',(req,res) => {
  const result = getPatientByID(req.params.id);
  console.log(result);
  res.json(result);
});
PatientRouter.post('/:id/entries',(req,res) => {
  const newid:string = uuid();
  const patient = getPatientByID(req.params.id);
  try{
    const newEntry:Entry = req.body as Entry;
    newEntry.id = newid;
    const newpat = patient[0].entries.push(newEntry);
    console.log(newpat);
    res.json(newpat);
  }catch (error:unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});