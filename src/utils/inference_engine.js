const { Rule, Rools } = require('rools')
const symptoms = require('./working_memory')

let facts = ''
const getvalues = (gender, weight, height, age, exercise) => {
    const getvalues = symptoms.setSymptoms(gender, weight, height, age, exercise, (res) => {
        return res
    });
    facts = getvalues
    return facts
}

// getvalues(false, 300, 400, true, false, false, false, false, false, false, false, false, false)


//get the values
// let facts = 
// symptoms.setSymptoms(false, 300, 400, true, false, false, false, false, false, false, false, false, false, (res) => {
//     return res
// });



//Symptoms
//if you have two trues, it can be you have diabetes
const calculateBMIbyForMale = new Rule({
    name: 'If gender is Male',
    when: (facts) =>  facts.user.gender == 'Male',
    then: (facts) => {
        let bmi = 
        parseFloat(facts.user.weight)/ (parseFloat(facts.user.height)/100 * parseFloat(facts.user.height)/100) ;
        facts.calculate.bmi = parseFloat(bmi.toFixed(2));
    },
});

const checkBmiUnderweight = new Rule({
    name: 'If BMI < 18.5 then BMI is Underweight',
    when: (facts) => parseInt(facts.calculate.bmi) < 18.5,
    then: (facts) => {
        facts.calculate.bmiStatus = 'Underweight';
    },
});

const checkBmiNormal = new Rule({
    name: 'If BMI => 18.5 && BMI < 25 then BMI is Normal',
    when: (facts) => parseInt(facts.calculate.bmi) >= 18.5 && parseInt(facts.calculate.bmi) < 25,
    then: (facts) => {
        facts.calculate.bmiStatus = 'Normal';
    },
});

const checkBmiOverweight = new Rule({
    name: 'If BMI => 25 && BMI < 30 then BMI is Overweight',
    when: (facts) => parseInt(facts.calculate.bmi) >= 25 && parseInt(facts.calculate.bmi) <= 30,
    then: (facts) => {
        facts.calculate.bmiStatus = 'Overweight';
    },
});

const checkBmiObese = new Rule({
    name: 'If BMI => 30 then BMI is Obese',
    when: (facts) => parseInt(facts.calculate.bmi) > 30,
    then: (facts) => {
        facts.calculate.bmiStatus = 'Obesity';
    },
});

const sedentary = new Rule({
    name: 'If not exercise or little exercise then sedentary',
    when: (facts) => parseInt(facts.user.exercise) == 0,
    then: (facts) => {
        facts.calculate.activeness = 'Sedentary';
    },
});

const lowActive = new Rule({
    name: 'If exercise 1-3 days per week then low active',
    when: (facts) => parseInt(facts.user.exercise) == 1,
    then: (facts) => {
        facts.calculate.activeness = 'Low active';
    },
});

const active = new Rule({
    name: 'If exercise 3-5 days per week then active',
    when: (facts) => parseInt(facts.user.exercise) == 2,
    then: (facts) => {
        facts.calculate.activeness = 'Active';
    },
});

const veryActive = new Rule({
    name: 'If exercise 6-7 days per week then active',
    when: (facts) => parseInt(facts.user.exercise) == 3,
    then: (facts) => {
        facts.calculate.activeness = 'Very Active';
    },
});

const vigorousTraining = new Rule({
    name: 'If vigorous training',
    when: (facts) => parseInt(facts.user.exercise) == 4,
    then: (facts) => {
        facts.calculate.activeness = 'Extremely Active';
    },
});

// //Rule
// const calorieNeededPerDay = new Rule({
//     name: 'If vigorous training',
//     when: (facts) => parseInt(facts.user.exercise) == 4,
//     then: (facts) => {
//         facts.calculate.activeness = 'Extremely Active';
//     },
// });

//eval
const evaluation = async () => {
    const rools = new Rools()

    try {
        await rools.register([calculateBMIbyForMale ,checkBmiUnderweight ,checkBmiNormal, checkBmiOverweight, checkBmiObese, sedentary,lowActive,active,veryActive, vigorousTraining ]);
        await rools.evaluate(facts)
        // console.log(await rools.evaluate(facts))
        return facts
        //return console.log(facts)
    } catch (error) {
        //return console.log(error)
        return error
    }
}

evaluation((res) => {
    console.log(facts.calculate.activeness);
    console.log(res)
})

//call set paramater function and evaluation functions
const finalresult = async (gender, weight, height, age, exercise,) => {
    try {
        await getvalues(gender, weight, height, age, exercise,)
        const res = await evaluation()
        return res
    } catch (error) {
        return error
    }
}

// finalresult(false, 300, 400, true, false, false, false, false, false, false, false, false, false)
module.exports = { finalresult }