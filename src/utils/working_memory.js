
const setSymptoms = (gender, weight, height, age, exercise,callback) => {
    let facts = {
        user: {
            gender: gender,
            weight: weight,
            height: height,
            age: age,
            exercise: exercise,
        },
        newfact: {
            bmi: '',
            weightToAchieve: '',
            dayToReach: '',
            calorieIntake: '',
            caloriegoals: '',
            bmiStatus: '',
            set: '',
            setCalorie: '',
            do: '',
        },
    
        result:{
            conclusion: '',
            recommendation: '',
            explanation: '',  
        },
    }

    return callback(facts)
}

// get the symtoms
// setSymptoms(true, true, true, true, true, true, false, false, false, true, (res) => {
//     console.log(res)
// })


module.exports = { setSymptoms: setSymptoms }