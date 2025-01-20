import { Gender, HealthCheckRating, NewPatientEntry, Type , Diagnosis} from "../types";
import {   z } from 'zod';

export const newPatientSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
  ssn:z.string(),
  dateOfBirth: z.string(),
  entries: z.array(z.object({
    type:z.nativeEnum(Type),
  })
  ),
});

export const newHospitalEntrySchema = z.object({
  id:z.string(),
  type:z.nativeEnum(Type),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  discharge: z.object({date: z.string(), criteria: z.string(),}),
  diagnosisCodes:z.array(z.string()).optional(),
  
});
export const newOccupationalEntrySchema = z.object({
  id:z.string(),
  type:z.nativeEnum(Type),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  employerName: z.string(),
  SickLeave:z.array(z.object({sickLeave:z.string(),endDate:z.string()})).optional(),
  diagnosisCodes:z.array(z.string()).optional(),
});
export const newHealtCheckEntrySchema = z.object({
  id:z.string(),
  type:z.nativeEnum(Type),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
  diagnosisCodes:z.array(z.string()).optional()
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  
  return newPatientSchema.parse(object);
};


export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};