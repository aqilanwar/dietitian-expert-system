const questionsform = document.querySelector('form')
console.log(questionsform)
//symptoms
const gender = document.querySelector('#gender')
const weight = document.querySelector('#weight')
const height = document.querySelector('#height')
const age = document.querySelector('#age')
const exercise = document.querySelector('#exercise')

// // console.log(p, fpg, gthae, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10)

// //to gt the percentage
const result_message = document.querySelector('#results')
// //get the pare
const getParentTest = document.querySelector('#ParentTest')
const SymptomsTest = document.querySelector('#SymptomsTest')
const fpgTest = document.querySelector('#fpgTest')
const gthaeTest = document.querySelector('#gthaeTest')
const theFinalResult = document.querySelector('#finalResult')

const expertresult = async (gender, weight, height,age, exercise) => {
    result_message.textContent = "..loading .."
    const url = await `evaluation?gender=${gender}&weight=${weight}&height=${height}&age=${age}&exercise=${exercise}`
    //const url = await `/evaluation/?dp=true&fpg=890&gthae=140&s1=true&s2=true&s3=false&s4=false&s5=false&s6=false&s7=false&s8=false&s9=false&s10=false`

    if (gender === 'Choose...' || weight == null || height == null || age == null
        || exercise === 'Choose...') 
        {
        console.log('takleh bro');
        // return result_message.textContent = '.. you must complete all the questions! ..'
        throw new Error('cannot be accepted')
    }

    try {
        const b = await fetch(url)
        return b
    } catch (error) {
        return error

    }
}


questionsform.addEventListener('submit', (e) => {
    e.preventDefault();
    expertresult(gender.value, weight.value, height.value, age.value, exercise.value)
        .then((result) => {
            result.json().then((res) => {
                console.log('here is the result : ', res)
                const data = {
                    calculate: {
                        bmi: res.calculate.bmi,
                        weightToAchieve: res.calculate.weightToAchieve,
                        weightToLose: res.calculate.weightToLose,
                        currentCalorieIntake: res.calculate.currentCalorieIntake,
                        bmiStatus: res.calculate.bmiStatus,
                        activeness: res.calculate.activeness,
                    }

                }
                console.log('ni data' , data.calculate);
                result_message.textContent = 'BMI : ' + data.calculate.bmi + '%'
                getParentTest.textContent = 'BMI Status : ' + data.calculate.bmiStatus
                SymptomsTest.textContent = 'Weight to lose : ' + data.calculate.weightToLose
                fpgTest.textContent = 'Weight to achieve : ' + data.calculate.weightToAchieve
                gthaeTest.textContent = 'Activeness :  ' + data.calculate.activeness
                // theFinalResult.textContent = 'Final Conclusion : ' + data.final_result
            })
        })
        .catch((err) => {
            result_message.textContent = '.. you must complete all the questions! ..'
            console.log('this is the error ', err)
        })
})