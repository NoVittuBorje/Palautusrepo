import { Gender, NewPatientEntry, Type } from "../types";
import { z } from 'zod';

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


export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  console.log(object);
  return newPatientSchema.parse(object);
};