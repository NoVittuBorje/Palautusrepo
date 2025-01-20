import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import AddPatientHospitalEntryForm from './AddPatientHospitalEntryForm';
import { Diagnosis, Entry } from '../../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Entry) => void;
  error?: string;
  diagnoses:Diagnosis[];
}

const AddPatientHospitalEntryModal = ({ modalOpen, onClose, onSubmit, error ,diagnoses}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>new Hospital entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddPatientHospitalEntryForm onSubmit={onSubmit} onCancel={onClose}  diagnoses={diagnoses}/>
    </DialogContent>
  </Dialog>
);

export default AddPatientHospitalEntryModal;