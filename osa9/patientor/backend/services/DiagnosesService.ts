import data from '../data/diagnoses';
import { Diagnosis } from '../types';
export const getAllDiagnoses = ():Diagnosis[] => {
    return data;
};