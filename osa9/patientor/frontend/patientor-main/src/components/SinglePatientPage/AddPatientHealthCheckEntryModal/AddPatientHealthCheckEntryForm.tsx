import { Grid, Button, TextField, Radio, FormControlLabel, RadioGroup, FormControl, FormLabel,Input, Checkbox, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Diagnosis, Entry, HealthCheckRating } from "../../../types";

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
  setError:React.Dispatch<React.SetStateAction<string|undefined>>;
  diagnoses:Diagnosis[]
}

const AddPatientHealthCheckEntryForm = ({ onCancel, onSubmit, setError, diagnoses}: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [type, setType] = useState('HealthCheck');
  const id = "";
  const [healthCheckRating,setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosesCodes] = useState<string[]>([]);
  

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
    onSubmit({
      type,
      description,
      date,
      specialist,
      healthCheckRating,
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

          
          
          <FormControl>
          <FormLabel id="juu" >HealtRating</FormLabel>
          <RadioGroup
            
            row
            aria-labelledby="juu"
            defaultValue={HealthCheckRating.Healthy}
            name="Health-button-Group"
          >
            <FormControlLabel value={HealthCheckRating.CriticalRisk} control={<Radio value={3} onChange={({ target }) => setHealthCheckRating(Number(target.value))}/>} label={HealthCheckRating.CriticalRisk} />
            <FormControlLabel value={HealthCheckRating.HighRisk} control={<Radio value={2} onChange={({ target }) => setHealthCheckRating(Number(target.value))}/>} label={HealthCheckRating.HighRisk} />
            <FormControlLabel value={HealthCheckRating.LowRisk} control={<Radio value={1} onChange={({ target }) => setHealthCheckRating(Number(target.value))}/>} label={HealthCheckRating.LowRisk} />
            <FormControlLabel value={HealthCheckRating.Healthy} control={<Radio value={0} onChange={({ target }) => setHealthCheckRating(Number(target.value))}/>} label={HealthCheckRating.Healthy} />
          </RadioGroup>
        </FormControl>
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

export default AddPatientHealthCheckEntryForm;