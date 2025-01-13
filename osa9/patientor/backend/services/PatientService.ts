
import {  NonSensitivePatient, Patient } from "../types";
import patientEntries from "../data/patients";
export const getnonSensitivePatients = ():NonSensitivePatient[] => {
    function omit<Data extends object, Keys extends keyof Data>(
        data: Data,
        keys: Keys[]
      ): Omit<Data, Keys> {
        const result = { ...data };
      
        for (const key of keys) {
          delete result[key];
        }
      
        return result as Omit<Data, Keys>;
      }
    const nonsensPatients = patientEntries.map((patient) =>
        omit(patient, ["ssn","entries"])
      );
    return nonsensPatients;
};
export const getPatientByID = (id:string) => {
  const result = patientEntries.filter(patient => patient.id === id);
  return result;
};
export const addNewPatient = (newEntry:Patient) => {
  patientEntries.push(newEntry);
  
};