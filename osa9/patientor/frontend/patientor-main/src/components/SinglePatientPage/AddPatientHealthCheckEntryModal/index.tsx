import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import AddPatientEntryForm from './AddPatientHealthCheckEntryForm';
import { Diagnosis, Entry } from '../../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Entry) => void;
  error?: string;
  setError:React.Dispatch<React.SetStateAction<string|undefined>>;
  diagnoses:Diagnosis[];
}

const AddPatientHealthCheckEntryModal = ({ modalOpen, onClose, onSubmit, error,setError ,diagnoses}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>new HealtCheck entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddPatientEntryForm onSubmit={onSubmit} onCancel={onClose} setError={setError} diagnoses={diagnoses}/>
    </DialogContent>
  </Dialog>
);

export default AddPatientHealthCheckEntryModal;