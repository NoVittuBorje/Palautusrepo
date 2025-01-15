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
    console.log(props);
    return (
        <div style={DivStyle} key={props.id}>
            <p style={TextStyle}>{props.date} <MedicalServicesIcon/></p>
            <p style={TextStyle}>{props.description}</p>
            <p style={TextStyle}>{healthIcon(props.healthCheckRating)}</p>
            {props.diagnosisCodes?.map(code => {
                return (<a style={TextStyle}>{code} ,</a>);
            })}
            <p style={TextStyle}>diagnosed by {props.specialist}</p>
        </div>
    );
};
export default HealthCheckDetails;