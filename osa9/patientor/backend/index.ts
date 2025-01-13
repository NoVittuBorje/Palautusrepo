import express from 'express';
import {PatientRouter} from "./routes/PatientRoute";
import cors from 'cors';
import { DiagnosesRouter } from './routes/DiagnosisRoute';


const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.use('/api/diagnoses',DiagnosesRouter);
app.use('/api/patients',PatientRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});