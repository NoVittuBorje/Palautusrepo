import { Router,Response } from 'express';
import { getnonSensitivePatients, getPatientByID } from '../services/PatientService';
import { Entry,  NonSensitivePatient, Patient} from '../types';
import { v1 as uuid } from 'uuid';
import {  newHealtCheckEntrySchema,  newHospitalEntrySchema,  newOccupationalEntrySchema,  newPatientSchema} from '../utils/utils';
import { z } from 'zod';
import { addNewPatient } from '../services/PatientService';
import cors from 'cors';
export const PatientRouter = Router();
PatientRouter.use(cors());
PatientRouter.get('/', (_req,res:Response<NonSensitivePatient[]>) => {
    
    const result = getnonSensitivePatients();
    
    res.send(result);
});
PatientRouter.post('/',(req,res) => {
    const newid:string = uuid();
    try {
        const newEntry:Patient = newPatientSchema.parse(req.body) as Patient;
        
        newEntry.id = newid;
        addNewPatient(newEntry);
        
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
    console.log(req.body,"body");
    const type = req.body.type as string;
    if (type == "HealthCheck"){
      
    const newEntry:Entry = newHealtCheckEntrySchema.parse(req.body) as Entry;
    newEntry.id = newid;
    const newpat = patient[0].entries;
    newpat.push(newEntry);
    patient[0].entries = newpat;
    
    
    res.json(patient);
    }
    if (type == "Hospital"){
      
      const newEntry:Entry = newHospitalEntrySchema.parse(req.body) as Entry;
      newEntry.id = newid;
      const newpat = patient[0].entries;
      newpat.push(newEntry);
      patient[0].entries = newpat;
      
      
      res.json(patient);
      }
      if (type == "OccupationalHealthcare"){
        
        const newEntry:Entry = newOccupationalEntrySchema.parse(req.body) as Entry;
        newEntry.id = newid;
        const newpat = patient[0].entries;
        newpat.push(newEntry);
        patient[0].entries = newpat;
        res.json(patient);
        }
  }catch (error:unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
  }
);