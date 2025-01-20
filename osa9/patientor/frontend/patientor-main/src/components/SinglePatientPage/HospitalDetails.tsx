import { HospitalEntry } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { DivStyle, TextStyle } from "./PageStyle";
const HospitalDetails = (props:HospitalEntry) => {
    return (
        <div style={DivStyle}>
        <p style={TextStyle}>{props.date} <MedicalServicesIcon/> </p>
        <p style={TextStyle}>{props.description}</p>
        {props.diagnosisCodes?.map(code => {
                return (<a style={TextStyle}>{code} ,</a>);
            })}
        <p style={TextStyle}>diagnosed by {props.specialist}</p>
        </div>
    );
};
export default HospitalDetails;