import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import AddPatientEntryForm from './AddPatientHealthCheckEntryForm';
import { Diagnosis, Entry } from '../../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Entry) => void;
  error?: string;
  diagnoses:Diagnosis[];
}

const AddPatientHealthCheckEntryModal = ({ modalOpen, onClose, onSubmit, error ,diagnoses}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>new HealtCheck entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddPatientEntryForm onSubmit={onSubmit} onCancel={onClose}  diagnoses={diagnoses}/>
    </DialogContent>
  </Dialog>
);

export default AddPatientHealthCheckEntryModal;