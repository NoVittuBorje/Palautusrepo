import {  HealthCheckEntry } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Favorite } from "@mui/icons-material";
import { DivStyle,TextStyle } from "./PageStyle";
const healthIcon = (Rating:number) => {
    if (Rating === 0){
        return (
        <Favorite style={{color:"green"}}/>
    );
    }
    if (Rating === 1){
        return (
            <Favorite style={{color:"yellow"}}/>
    );
    }
    else{
        return (
            <Favorite style={{color:"red"}}/>
        );
    }
};

const HealthCheckDetails = (props:HealthCheckEntry) => {
    return (
        <div style={DivStyle}>
            <p style={TextStyle}>{props.date} <MedicalServicesIcon/></p>
            <p style={TextStyle}>{props.description}</p>
            <p style={TextStyle}>{healthIcon(props.healthCheckRating)}</p>
            <p style={TextStyle}>diagnosed by {props.specialist}</p>
        </div>
    );
};
export default HealthCheckDetails;