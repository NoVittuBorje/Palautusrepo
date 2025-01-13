import { Grid, Button, TextField, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Entry, Type } from "../../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: Entry) => void;
}
interface TypeOption{
  value: Type;
  label: string;
}

const typeOptions: TypeOption[] = Object.values(Type).map(v => ({
  value: v, label: v.toString()
}));
const AddPatientEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [type,setType] = useState("");
  const AddHospitalEntry = () => {

    return (
      <form onSubmit={addEntry}>
    <TextField
      label="description"
      fullWidth 
      value={description}
      onChange={({ target }) => setDescription(target.value)}
    />
    <TextField
      label="date"
      fullWidth 
      placeholder="YYYY-MM-DD"
      value={date}
      onChange={({ target }) => setDate(target.value)}
    />
    <TextField
      label="specialist"
      fullWidth 
      value={specialist}
      onChange={({ target }) => setSpecialist(target.value)}
    />
    </form>
    );
  };
  const AddHealtCheckEntry = () => {
    return (
      <form onSubmit={addEntry}>
    <TextField
      label="description"
      fullWidth 
      value={description}
      onChange={({ target }) => setDescription(target.value)}
    />
    <TextField
      label="date"
      fullWidth 
      placeholder="YYYY-MM-DD"
      value={date}
      onChange={({ target }) => setDate(target.value)}
    />
    <TextField
      label="specialist"
      fullWidth 
      value={specialist}
      onChange={({ target }) => setSpecialist(target.value)}
    />
    </form>
    );
  };
  const AddOccupationEntry = () => {

    return (
      <form onSubmit={addEntry}>
    <TextField
      label="description"
      fullWidth 
      value={description}
      onChange={({ target }) => setDescription(target.value)}
    />
    <TextField
      label="date"
      fullWidth 
      placeholder="YYYY-MM-DD"
      value={date}
      onChange={({ target }) => setDate(target.value)}
    />
    <TextField
      label="specialist"
      fullWidth 
      value={specialist}
      onChange={({ target }) => setSpecialist(target.value)}
    />
    </form>
    );
  };
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type,
      description,
      date,
      specialist,
    });
    };
    const onTypeChange = (event: SelectChangeEvent<string>) => {
      event.preventDefault();
      if ( typeof event.target.value === "string") {
        const value = event.target.value;
        const newtype = Object.values(Type).find(g => g.toString() === value);
        if (newtype) {
          setType(newtype);
          console.log(newtype);
          console.log(type);
        }
      }
    };
    const ShowMoreForm = () => {
      console.log(type);
      if (type === "HealthCheck"){
      return (
        <AddHealtCheckEntry></AddHealtCheckEntry>
      );}
      if (type === "Hospital"){
        return (
          <AddHospitalEntry></AddHospitalEntry>
        );
      }
      if (type === "OccupationalHealthcare"){
        return(
          <AddOccupationEntry></AddOccupationEntry>
        );
      }
    };
    return (
        <div>
          <form onSubmit={addEntry}>
          <InputLabel style={{ marginTop: 20 }}>Type of Entry</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
        {typeOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>
            <TextField
            label="description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="date"
            fullWidth 
            placeholder="YYYY-MM-DD"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="specialist"
            fullWidth 
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        
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

export default AddPatientEntryForm;