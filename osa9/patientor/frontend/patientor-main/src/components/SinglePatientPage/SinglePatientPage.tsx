import diagnosesService from "../../services/diagnoses";
import patientService from "../../services/patients";
import { Diagnosis, Entry,  Patient } from "../../types";
import { useState } from "react";
import { useMatch } from "react-router-dom";
import HospitalDetails from "./HospitalDetails";
import OccupationalDetails from "./OccupationDetails";
import HealthCheckDetails from "./HealthCheckDetails";
import { Button, Table, TableCell} from "@mui/material";
import axios from "axios";
import { TextStyle } from "./PageStyle";
import AddPatientHealthCheckEntryModal from "./AddPatientHealthCheckEntryModal";
import AddPatientHospitalEntryModal from "./AddPatientHospitalEntryModal";
import AddPatientOccupationalEntryModal from "./AddPatientOccupationalEntryModal";

const EntryDetails: React.FC<{entry:Entry}> = ({entry}) => {
    switch(entry.type) {
        case"Hospital":
        return <HospitalDetails type={entry.type} discharge={entry.discharge} id={entry.id} description={entry.description} date={entry.date} specialist={entry.specialist} diagnosisCodes={entry.diagnosisCodes}/>;
        case "OccupationalHealthcare":
            return <OccupationalDetails type={entry.type} employerName={entry.employerName} id={entry.id} description={entry.description} date={entry.date} specialist={entry.specialist} diagnosisCodes={entry.diagnosisCodes}/>;
        case "HealthCheck":
            return <HealthCheckDetails type={entry.type} healthCheckRating={entry.healthCheckRating} id={entry.id} description={entry.description} date={entry.date} specialist={entry.specialist} diagnosisCodes={entry.diagnosisCodes}/>;
        default:
            return null;
    }
};
const SinglePatientPage = () => {
    const [patient, setPatient] = useState<Patient[]>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const [error, setError] = useState<string>();

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
    
    
    const submitNewPatientEntry = async (values: Entry) => {
        try {
            console.log(values);
            const newpat = await patientService.createEntry(values,patient[0].id);
            setPatient(newpat);
            setModalOpen(false);
          } catch (e: unknown) {
            
            if (axios.isAxiosError(e)) {
              if (e.response.data){
                console.log(e.response.data.error[0]);
                const errorData = e.response.data.error[0];
                setError(errorData.message);
              

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
    const entries:Entry[] = patient[0].entries;
    const patientDetails = patient[0];
    console.log(patient);
    return(
        <div key={patientDetails.id}>
            <h2 style={TextStyle}>{patientDetails.name}</h2>
            <p style={TextStyle}>ssn: {patientDetails.ssn}</p>
            <p style={TextStyle}>occupation: {patientDetails.occupation}</p>
            <b style={{marginLeft:"3%" }}>Entries</b>
            {entries.map((entry:Entry) => {
                console.log(entry);
                const entryDetails = EntryDetails({entry});
                return(
                    <Table style={{margin:"0px",marginTop:"0px",marginBottom:"0px"}}>
                        <TableCell key={entry.id} size="small">{entryDetails}</TableCell>
                    </Table>
                );
            }
            )}
        <AddPatientHealthCheckEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatientEntry}
        error={error}
        onClose={closeModal}
        setError={setError}
        diagnoses={diagnoses}
      />
        <Button variant="contained" onClick={() => openModal()}>Add New Entry</Button>

        <AddPatientHospitalEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatientEntry}
        error={error}
        onClose={closeModal}
        setError={setError}
        diagnoses={diagnoses}
      />
        <Button variant="contained" onClick={() => openModal()}>Add New Entry</Button>

        <AddPatientOccupationalEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatientEntry}
        error={error}
        onClose={closeModal}
        setError={setError}
        diagnoses={diagnoses}
      />
        <Button variant="contained" onClick={() => openModal()}>Add New Entry</Button>

        </div>
    );}

}};
export default SinglePatientPage;