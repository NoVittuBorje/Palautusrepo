import express from 'express'
import calculateBmi from './bmiCalculator';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});
app.get('/bmi', (req,res) => {
    let weight = req.query.weight
    let heigth = req.query.height

    let bmi = calculateBmi(Number(weight),Number(heigth))
    
    res.send({weight:weight,heigth:heigth,bmi:bmi})
})
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});