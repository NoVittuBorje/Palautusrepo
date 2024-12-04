
const calculateBmi = (w:number,h:number) :string => {
    let hsqred = h * h
    let bmi = hsqred/w
    if (bmi < 18.5) return "underweight"
    if (bmi > 18.5 && bmi < 24.9) return "healthy"
    if (bmi > 25 && bmi < 29.9) return "overweight"
    if (bmi > 30 && bmi < 39.9) return "obese"
    if (bmi > 40) return "severe obesity"
    else return "input not numbers"
}
const w: number = Number(process.argv[2])
const h: number = Number(process.argv[3])
console.log(calculateBmi(w,h))
export default calculateBmi