interface ResultInterface { 
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (input : number[],target:number) => {
    const calcTrainingdays = (input:number[]):number => {
        let res = 0
        input.forEach(i => {
            if (i > 0) {
                res = res + 1
            }
        })
        return res
    }
    const calcSuccess = (length:number,days:number,target:number):boolean => {
        if (length/days > target) return true
        else return false
    }
    const calcRating = (length:number,days:number):number => {
        let rating = days / length
        if (rating > 0.8) return 3
        if (rating > 0.5 && rating < 0.8) return 2
        return 1
    }
    const selectDesc = (rating:number):string => {
        if (rating == 1) return 'bad do better'
        if (rating == 2) return 'not too bad but could be better'
        if (rating == 3) return 'good'
        return ""
    }
    const calcAverage = (input:number[],length:number):number => {
        let all = 0
        input.forEach(element => {
            all = all + element
        });
        return all / length
    }
    let periodLength = input.length
    let trainingDays = calcTrainingdays(input)
    let success = calcSuccess(periodLength,trainingDays,target)
    let rating = calcRating(periodLength,trainingDays)
    let ratingDesc = selectDesc(rating)
    let average = calcAverage(input,periodLength)
    
    const result: ResultInterface = {
        periodLength : periodLength,
        trainingDays : trainingDays,
        success : success,
        rating : rating,
        ratingDescription : ratingDesc,
        target : target,
        average : average,
    }

    
    return result
}
const target: number = Number(process.argv[2])
let argv = process.argv.slice(3)
let input:number[] = []
argv.forEach(v => {
    input.push(Number(v))
})




console.log(calculateExercises(input,target))