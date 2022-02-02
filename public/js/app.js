const questionsform = document.querySelector('form')
console.log(questionsform)
//symptoms
const gender = document.querySelector('#gender')
const weight = document.querySelector('#weight')
const height = document.querySelector('#height')
const age = document.querySelector('#age')
const exercise = document.querySelector('#exercise')


const result_message = document.querySelector('#error')
// //get the pare
const explanation = document.querySelector('#explanation')
const conclusion = document.querySelector('#conclusion')
const recommendation = document.querySelector('#recommendation')
const food = document.querySelector('#food')

const myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false
  })

const expertresult = async (gender, weight, height,age, exercise) => {
    // result_message.textContent = "..loading .."
    // console.log('oi');
    const url = await `evaluation?gender=${gender}&weight=${weight}&height=${height}&age=${age}&exercise=${exercise}`
    //const url = await `/evaluation/?dp=true&fpg=890&gthae=140&s1=true&s2=true&s3=false&s4=false&s5=false&s6=false&s7=false&s8=false&s9=false&s10=false`

    if (gender === 'Choose...' || weight == null || height == null || age == null || exercise === 'Choose...') 
        {
        console.log('takleh bro');
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
                    newfact:{
                        set: res.result.set,
                    },
                    result: {
                        explanation: res.result.explanation,
                        conclusion: res.result.conclusion,
                        recommendation: res.result.recommendation,
                        food: {
                            breakfast: res.result.food.breakfast,
                            lunch: res.result.food.lunch,
                            hitea: res.result.food.hitea,
                            dinner: res.result.food.dinner,

                        },
                    }
                }
                // if (data.newfact.set !== undefined) {
                //     food = data.result.food.breakfast + '\n' + data.result
                // }
                explanation.textContent =  data.result.explanation,
                conclusion.textContent =  data.result.conclusion,
                recommendation.innerHTML = data.result.recommendation,
                myModal.toggle();

            })
        })
        .catch((err) => {
            result_message.textContent = 'You must complete all the questions!'
            console.log('this is the error ', err)
        })
})

