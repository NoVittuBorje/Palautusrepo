import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import AddPatientEntryForm from './AddPatientEntryForm';
import { Entry } from '../../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Entry) => void;
  error?: string;
}

const AddPatientEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddPatientEntryForm onSubmit={onSubmit} onCancel={onClose}/>
    </DialogContent>
  </Dialog>
);

export default AddPatientEntryModal;