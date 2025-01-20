import axios from "axios";
import { Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getbyId = async (id:string | undefined) => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients/${id}`
  );
  
  return data;
};
const createEntry = async (object:Entry,id:string | undefined) =>{
  const { data } = await axios.post<Patient[]>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};
export default {
  getAll, create,
  getbyId,createEntry,
};

