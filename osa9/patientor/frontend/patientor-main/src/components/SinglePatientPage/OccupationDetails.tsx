import { OccupationalHealthcareEntry } from "../../types";
import { LocalHospital } from "@mui/icons-material";
import { DivStyle, TextStyle } from "./PageStyle";
const OccupationalDetails = (props:OccupationalHealthcareEntry) => {
    return (
        <div style={DivStyle}>
        <p style={TextStyle}>{props.date} <LocalHospital/> {props.employerName}</p>
        <p style={TextStyle}>{props.description}</p>
        
        {props.diagnosisCodes?.map(code => {
                return (<a style={TextStyle}>{code} ,</a>);
            })}
        <p style={TextStyle}>diagnosed by {props.specialist}</p>
        </div>
    );
};
export default OccupationalDetails;