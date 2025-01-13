import diagnosesService from "../../services/diagnoses";
import patientService from "../../services/patients";
import { Diagnosis, Entry, Patient } from "../../types";
import { useState } from "react";
import { useMatch } from "react-router-dom";
import HospitalDetails from "./HospitalDetails";
import OccupationalDetails from "./OccupationDetails";
import HealthCheckDetails from "./HealthCheckDetails";
import { Button, Table, TableCell} from "@mui/material";
import axios from "axios";
import AddPatientEntryModal from "./AddPatientEntryModal";
const EntryDetails: React.FC<{entry:Entry}> = ({entry}) => {
    console.log(entry);
    switch(entry.type) {
        case"Hospital":
        return <HospitalDetails type={entry.type} discharge={entry.discharge} id={entry.id} description={entry.description} date={entry.date} specialist={entry.specialist} />;
        case "OccupationalHealthcare":
            return <OccupationalDetails type={entry.type} employerName={entry.employerName} id={entry.id} description={entry.description} date={entry.date} specialist={entry.specialist}/>;
        case "HealthCheck":
            return <HealthCheckDetails type={entry.type} healthCheckRating={entry.healthCheckRating} id={entry.id} description={entry.description} date={entry.date} specialist={entry.specialist}/>;
        default:
            return null;
    }
};
const SinglePatientPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    
    const openModal = (): void => setModalOpen(true);
    
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
      };
    const submitNewPatientEntry = async (values: Entry) => {
        try {
            console.log(values);
            const newpat = await patientService.createEntry(values,patient.id);
            console.log(newpat);
            setPatient(newpat);
            setModalOpen(false);
          } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
              if (e?.response?.data && typeof e?.response?.data === "string") {
                const message = e.response.data.replace('Something went wrong. Error: ', '');
                console.error(message);
                setError(message);
              } else {
                setError("Unrecognized axios error");
              }
            } else {
              console.error("Unknown error", e);
              setError("Unknown error");
            }
          }
    };
    const MatchId = useMatch("/patients/:id");
    if (MatchId !== undefined && MatchId !== null) {
    const fetchData = async () => {
        const id = MatchId.params.id;
        const patdata = await patientService.getbyId(id);
        setPatient(patdata);
        const diadata = await diagnosesService.getAllDiagnoses();
        setDiagnoses(diagnoses.concat(diadata));
    };

    if (!patient){
        fetchData();
    }

    
    if (patient && diagnoses){
    console.log(patient);
    console.log(patient.entries);
    console.log(diagnoses);
    const entries:Entry[] = patient[0].entries;
    return(
        <div>
            <h2>{patient.name}</h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <b>entries</b>
            {entries.map((entry:Entry) => {
                console.log(entry);
                const entryDetails = EntryDetails({entry});
                return(
                    <Table style={{margin:"0px",marginTop:"0px",marginBottom:"0px"}}>
                        <TableCell size="small">{entryDetails}</TableCell>
                    </Table>
                );
            }
            )}
        <AddPatientEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatientEntry}
        error={error}
        onClose={closeModal}
      />
        <Button variant="contained" onClick={() => openModal()}>Add New Entry</Button>
        </div>
    );}

}};
export default SinglePatientPage;