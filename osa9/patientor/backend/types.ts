import { z } from 'zod';
import { newPatientSchema } from './utils/utils';

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}
interface OccupationalHealthcareEntry extends BaseEntry{
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?:SickLeave,
}
interface HospitalEntry extends BaseEntry{
    type:"Hospital",
    discharge: Discharge,
}
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}
export interface SickLeave {
    startDate: string;
    endDate: string;
}
export interface Discharge {
    date: string,
    criteria: string,
  }
export interface Diagnosis {
    code:string;
    name:string;
    latin?:string;
}
export enum Type {
    Hospital = "Hospital",
    OccupationalHealthcare = 'OccupationalHealthcare',
    HealthCheck = "HealthCheck"
}
export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;   

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth: string;
    entries: Entry[];
}

export type NewPatientEntry = z.infer<typeof newPatientSchema>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutSsnEntrie = UnionOmit<Entry, "ssn" | 'entries'>;

export type EntryWithoutId = Omit<Entry, "id">;