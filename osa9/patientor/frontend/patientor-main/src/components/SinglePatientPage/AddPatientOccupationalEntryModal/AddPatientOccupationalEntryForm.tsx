import { Grid, Button, TextField, FormControl, Input, Checkbox, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Diagnosis, Entry,  SickLeave } from "../../../types";

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

const AddPatientOccupationalEntryForm = ({ onCancel, onSubmit, diagnoses}: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const type = 'OccupationalHealthcare';
  const id = "";

  const [diagnosisCodes, setDiagnosesCodes] = useState<string[]>([]);
  const [employerName, setemployerName] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  

  
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
    const sickLeave:SickLeave = {startDate,endDate};
    onSubmit({
      type,
      description,
      date,
      specialist,
      employerName,
      sickLeave,
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
          <TextField 
          label="Employee"
          fullWidth
          value={employerName}
          onChange={({target}) => setemployerName(target.value)}
          />
          <div>
          <label>Sickleave:
            <div>
          <label>start
          <Input 
            type="date"
            id={"startdate"}           
            placeholder="YYYY-MM-DD"
            value={startDate}
            onChange={({ target }) => setstartDate(target.value)}/>
            </label>
            </div>
          <div>
              <label>end
          <Input 
            type="date"
            id={"enddate"}           
            placeholder="YYYY-MM-DD"
            value={endDate}
            onChange={({ target }) => setendDate(target.value)}/>
            </label>
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

export default AddPatientOccupationalEntryForm;