import { Grid, Button, TextField,  FormControl, Input, Checkbox, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Diagnosis, Discharge, Entry } from "../../../types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  onCancel: () => void;
  onSubmit: (values: Entry) => void;
  diagnoses:Diagnosis[]
}

const AddPatientHospitalEntryForm = ({ onCancel, onSubmit,  diagnoses}: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const type = 'Hospital';
  const id = "";
  const [diagnosisCodes, setDiagnosesCodes] = useState<string[]>([]);
  const [Dischargedate, setDischargedate] = useState("");
  const [criteria, setcriteria] = useState("");
  

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosesCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const discharge:Discharge = {
      date :Dischargedate,
      criteria
    };
    
    onSubmit({
      type,
      description,
      date,
      specialist,
      discharge,
      diagnosisCodes,
      id,
    });
    };
    return (
      
      <div>
          <form onSubmit={addEntry}>
            <TextField
            label="description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <label>Entry date:
          <Input 
            type="date"
            id={"date"}           
            placeholder="YYYY-MM-DD"
            value={date}
            onChange={({ target }) => setDate(target.value)}/>
            </label>
          <TextField
            label="specialist"
            fullWidth 
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        <div>
        <label>Discharge
          <div>
            <label >date:
          <Input 
            type="date"
            id={"disdate" }          
            placeholder="YYYY-MM-DD"
            value={Dischargedate}
            onChange={({ target }) => setDischargedate(target.value)}/>
            </label>
          </div>
        <div>
        <TextField
            label="criteria"
            fullWidth 
            value={criteria}
            onChange={({ target }) => setcriteria(target.value)}
          />
        </div>
        </label>
        </div>
        
          

        <div>
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="diagnosisCodes">Diagnosis Codes</InputLabel>
        <Select
          
          labelId="diagnosisCodes"
          multiple
          value={diagnosisCodes}
          onChange={handleChange}
          input={<OutlinedInput label="Diagnosis Codes" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {diagnoses.map((dia) =>(
            <MenuItem key={dia.code} value={dia.code}>
              <Checkbox checked={diagnosisCodes.includes(dia.code)}/>
              <ListItemText primary={dia.code} />
            </MenuItem>
          ))};
          </Select>
          </FormControl>
          </div>
          
          <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
        
          </form>
        </div>
        
      );
};

export default AddPatientHospitalEntryForm;