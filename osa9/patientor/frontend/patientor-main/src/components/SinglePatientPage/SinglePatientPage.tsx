import diagnosesService from "../../services/diagnoses";
import patientService from "../../services/patients";
import { Diagnosis, Entry,  Patient } from "../../types";
import { useState } from "react";
import { useMatch } from "react-router-dom";
import HospitalDetails from "./HospitalDetails";
import OccupationalDetails from "./OccupationDetails";
import HealthCheckDetails from "./HealthCheckDetails";
import { Button, Table, TableBody, TableContainer} from "@mui/material";
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

    const [modalOpenHealthCheck, setModalOpenHealthCheck] = useState<boolean>(false);
    const [modalOpenHospital, setModalOpenHospital] = useState<boolean>(false);
    const [modalOpenOccupational, setModalOpenOccupational] = useState<boolean>(false);
    const openModalHealthCheck = (): void => setModalOpenHealthCheck(true);
    const openModalHospital = (): void => setModalOpenHospital(true);
    const openModalOccupational = (): void => setModalOpenOccupational(true);
    const closeModal = (): void => {
        setModalOpenHospital(false);
        setModalOpenHealthCheck(false);
        setModalOpenOccupational(false);
        setError(undefined);
    };
    
    
    const submitNewPatientEntry = async (values: Entry) => {
      if (values.date == "" || values.description == "" || values.specialist == ""){
        setError("Empty date, description or specialist");
        return;
      }
      if(patient != undefined){
        try {
            
            const newpat = await patientService.createEntry(values,patient[0].id);
            
            setPatient(newpat);
            closeModal();
          } catch (e: unknown) {
            
            if (axios.isAxiosError(e)) {
              if (e?.response?.data && e.response != undefined){
                
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
    
    
    return(
      <div>
        <div>
            <h2 style={TextStyle}>{patientDetails.name}</h2>
            <p style={TextStyle}>ssn: {patientDetails.ssn}</p>
            <p style={TextStyle}>occupation: {patientDetails.occupation}</p>
            <div style={{marginTop:"5px",marginBottom:"5px"}}>
              <AddPatientHealthCheckEntryModal
              modalOpen={modalOpenHealthCheck}
              onSubmit={submitNewPatientEntry}
              error={error}
              onClose={closeModal}
              diagnoses={diagnoses}
            />
              <Button size="small" variant="contained" onClick={() => openModalHealthCheck()}>Add New HealthCheck Entry</Button>

              <AddPatientHospitalEntryModal
              modalOpen={modalOpenHospital}
              onSubmit={submitNewPatientEntry}
              error={error}
              onClose={closeModal}
              diagnoses={diagnoses}
            />
              <Button size="small" variant="contained" onClick={() => openModalHospital()}>Add New Hospital Entry</Button>

              <AddPatientOccupationalEntryModal
              modalOpen={modalOpenOccupational}
              onSubmit={submitNewPatientEntry}
              error={error}
              onClose={closeModal}
              diagnoses={diagnoses}
            />
            <Button size="small" variant="contained" onClick={() => openModalOccupational()}>Add New Occupational Entry</Button>
        </div>
            <b style={{marginLeft:"3%" }}>Entries</b>
            <TableContainer key={patientDetails.id}>
              <Table key="entryDetails" sx={{ minWidth: 650 }} aria-label="simple table">
            {entries.map((entry:Entry) => {
                
                const entryDetails = EntryDetails({entry});
                return(
                  <TableBody key={entry.id}>{entryDetails}</TableBody>
                );})}
                
              </Table>
            </TableContainer>

        </div>
      </div>
    );}

}};
export default SinglePatientPage;