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

// rules
const calculateBMI = new Rule({
    name: 'Calculate BMI based on weight and height',
    when: (facts) => facts.user.height != null && facts.user.weight != null,
    then: (facts) => {
        let bmi = 
        parseFloat(facts.user.weight)/ (parseFloat(facts.user.height)/100 * parseFloat(facts.user.height)/100) ;
        facts.newfact.bmi = parseFloat(bmi.toFixed(2));
    },
});

const RULE1 = new Rule({
    name: 'IF Gender is male THEN Show BMR using Mifflin-St Jeor equation for Male',
    when: (facts) => parseInt(facts.user.gender) == 'Male',
    then: (facts) => {
        facts.newfact.calorieIntake = ( parseFloat(10) * parseFloat(facts.user.weight) ) + (parseFloat(6.25) * parseFloat(facts.user.height) ) - (parseFloat(5) * parseFloat(facts.user.age) ) + 5;
    },
});

const RULE2 = new Rule({
    name: 'IF Gender is female THEN calculate calorie intake using Mifflin-St Jeor equation for Female',
    when: (facts) => parseInt(facts.user.gender) == 'Female',
    then: (facts) => {
        facts.newfact.calorieIntake = ( parseFloat(10) * parseFloat(facts.user.weight) ) + (parseFloat(6.25) * parseFloat(facts.user.height) ) - (parseFloat(5) * parseFloat(facts.user.age) ) - 161;
    },
});

const RULE3 = new Rule({
    name: 'IF BMI < 18.5 THEN User BMI is Underweight ',
    when: (facts) => parseInt(facts.newfact.bmi) < 18.5,
    then: (facts) => {
        facts.newfact.bmiStatus = 'Underweight';
    },
});
const RULE4 = new Rule({
    name: 'IF BMI >= 18.5 AND BMI < 25 THEN User BMI is Normal',
    when: (facts) => parseInt(facts.newfact.bmi) >= 18.5 && parseInt(facts.newfact.bmi) < 25,
    then: (facts) => {
        facts.newfact.bmiStatus = 'Normal';
    },
});
const RULE5 = new Rule({
    name: 'IF BMI >= 25 AND BMI < 30 THEN User BMI is Overweight',
    when: (facts) => parseInt(facts.newfact.bmi) >= 25 && parseInt(facts.newfact.bmi) <= 30,
    then: (facts) => {
        facts.newfact.bmiStatus = 'Overweight';
    },
});
const RULE6 = new Rule({
    name: 'If BMI => 30 THEN User BMI is Obese',
    when: (facts) => parseInt(facts.newfact.bmi) >30,
    then: (facts) => {
        facts.newfact.bmiStatus = 'Obese';
    },
});


// DO
const RULE7 = new Rule({
    name: 'IF BMI is underweight THEN need to increase calorie intake',
    when: (facts) => facts.newfact.bmiStatus == 'Underweight',
    then: (facts) => {
        facts.newfact.do = 'You need to increase calorie intake';
    },
});

const RULE8 = new Rule({
    name: 'IF BMI is normal THEN need to increase calorie intake',
    when: (facts) => facts.newfact.bmiStatus == 'Normal',
    then: (facts) => {
        facts.newfact.do = 'You need to maintain calorie intake';
    },
});

const RULE9 = new Rule({
    name: 'IF BMI is overweight THEN cut down your calorie intake',
    when: (facts) => facts.newfact.bmiStatus == 'Overweight',
    then: (facts) => {
        facts.newfact.do = 'You need to cut calorie intake';
    },
});

const RULE10 = new Rule({
    name: 'IF BMI is obese THEN we suggest you to meet dietitian or doctor',
    when: (facts) => facts.newfact.bmiStatus == 'Obese',
    then: (facts) => {
        facts.newfact.do = 'You need to meet dietitian or doctor to get diagnose',
        //draw conclusion, recommendation , explanation
        facts.result.conclusion = 'You are ' + facts.user.weight + 'kg ,'  +facts.user.height+ ' cm height and ' + facts.user.age + ' years old ' + facts.user.gender + '. Based on your BMI = ' + facts.newfact.bmi + ' , you are currently ' + facts.newfact.bmiStatus; 
        facts.result.recommendation = facts.newfact.do ;
        facts.result.explanation = 'Since you are obese , you need dietitian or doctor consultation to help you to choose the suitable diet and exercise based on the condition of your body'
    },
});

const RULE11 = new Rule({
    name: 'IF BMI is underweight OR BMI is normal OR BMI is overweight AND exercise is sedentary AND gender is male THEN calculate calorie intake for sedentary male ELSE calculate calorie intake for sedentary female',
    when: [
        (facts) => facts.newfact.bmiStatus == 'Underweight' || facts.newfact.bmiStatus == 'Normal' || facts.newfact.bmiStatus == 'Overweight'  ,
        (facts) => facts.user.exercise == 'Sedentary',
        (facts) => facts.user.gender == 'Male',
      ],
    then: (facts) => {
        facts.newfact.calorieIntake = ((parseFloat(10) * parseFloat(facts.user.weight)) + (parseFloat(6.25) * parseFloat(facts.user.height)) - (parseFloat(5) * (facts.user.age) + parseFloat(5))) * 1.2;
    },
});

const RULE12 = new Rule({
    name: 'IF BMI is underweight OR BMI is normal OR BMI is overweight AND exercise is low active AND gender is male THEN calculate calorie intake for sedentary male ELSE calculate calorie intake for sedentary female',
    when: [
        (facts) => facts.newfact.bmiStatus == 'Underweight'|| facts.newfact.bmiStatus == 'Normal' || facts.newfact.bmiStatus == 'Overweight' ,
        (facts) => facts.user.exercise == 'Low Active',
        (facts) => facts.user.gender == 'Male',
      ],
    then: (facts) => {
        facts.newfact.calorieIntake = ((parseFloat(10) * parseFloat(facts.user.weight)) + (parseFloat(6.25) * parseFloat(facts.user.height)) - (parseFloat(5) * (facts.user.age) + parseFloat(5))) * 1.375;
    },
});

const RULE13 = new Rule({
    name: 'IF BMI is underweight OR BMI is normal OR BMI is overweight AND exercise is active AND gender is male THEN calculate calorie intake for sedentary male ELSE calculate calorie intake for sedentary female',
    when: [
        (facts) => facts.newfact.bmiStatus == 'Underweight'|| facts.newfact.bmiStatus == 'Normal' || facts.newfact.bmiStatus == 'Overweight' ,
        (facts) => facts.user.exercise == 'Active',
        (facts) => facts.user.gender == 'Male',
      ],
    then: (facts) => {
        facts.newfact.calorieIntake = ((parseFloat(10) * parseFloat(facts.user.weight)) + (parseFloat(6.25) * parseFloat(facts.user.height)) - (parseFloat(5) * (facts.user.age) + parseFloat(5))) * 1.55;
    },
});

const RULE14 = new Rule({
    name: 'IF BMI is underweight OR BMI is normal OR BMI is overweight AND exercise is very active AND gender is male THEN calculate calorie intake for sedentary male ELSE calculate calorie intake for sedentary female',
    when: [
        (facts) => facts.newfact.bmiStatus == 'Underweight'|| facts.newfact.bmiStatus == 'Normal' || facts.newfact.bmiStatus == 'Overweight' ,
        (facts) => facts.user.exercise == 'Very Active',
        (facts) => facts.user.gender == 'Male',
      ],
    then: (facts) => {
        facts.newfact.calorieIntake = ((parseFloat(10) * parseFloat(facts.user.weight)) + (parseFloat(6.25) * parseFloat(facts.user.height)) - (parseFloat(5) * (facts.user.age) + parseFloat(5))) * 1.725;
    },
});

const RULE15 = new Rule({
    name: 'IF BMI is underweight OR BMI is normal OR BMI is overweight AND exercise is very active AND gender is male THEN calculate calorie intake for sedentary male ELSE calculate calorie intake for sedentary female',
    when: [
        (facts) => facts.newfact.bmiStatus == 'Underweight'|| facts.newfact.bmiStatus == 'Normal' || facts.newfact.bmiStatus == 'Overweight' ,
        (facts) => facts.user.exercise == 'Extremely Active',
        (facts) => facts.user.gender == 'Male',
      ],
    then: (facts) => {
        facts.newfact.calorieIntake = ((parseFloat(10) * parseFloat(facts.user.weight)) + (parseFloat(6.25) * parseFloat(facts.user.height)) - (parseFloat(5) * (facts.user.age) + parseFloat(5))) * 1.9;
    },
});
const RULE16 = new Rule({
    name: 'IF BMI is underweight OR BMI is normal OR BMI is overweight AND exercise is sedentary AND gender is female THEN calculate calorie intake for sedentary male ELSE calculate calorie intake for sedentary female',
    when: [
        (facts) => facts.newfact.bmiStatus == 'Underweight'|| facts.newfact.bmiStatus == 'Normal' || facts.newfact.bmiStatus == 'Overweight' ,
        (facts) => facts.user.exercise == 'Sedentary',
        (facts) => facts.user.gender == 'Female',
      ],
    then: (facts) => {
        facts.newfact.calorieIntake = ((parseFloat(10) * parseFloat(facts.user.weight)) + (parseFloat(6.25) * parseFloat(facts.user.height)) - (parseFloat(5) * (facts.user.age) - parseFloat(161))) * 1.2;
    },
});

const RULE17 = new Rule({
    name: 'IF BMI is underweight OR BMI is normal OR BMI is overweight AND exercise is low active AND gender is female THEN calculate calorie intake for sedentary male ELSE calculate calorie intake for sedentary female',
    when: [
        (facts) => facts.newfact.bmiStatus == 'Underweight'|| facts.newfact.bmiStatus == 'Normal' || facts.newfact.bmiStatus == 'Overweight' ,
        (facts) => facts.user.exercise == 'Low Active',
        (facts) => facts.user.gender == 'Female',
      ],
    then: (facts) => {
        facts.newfact.calorieIntake = ((parseFloat(10) * parseFloat(facts.user.weight)) + (parseFloat(6.25) * parseFloat(facts.user.height)) - (parseFloat(5) * (facts.user.age) - parseFloat(161))) * 1.375;
    },
});

const RULE18 = new Rule({
    name: 'IF BMI is underweight OR BMI is normal OR BMI is overweight AND exercise is active AND gender is female THEN calculate calorie intake for sedentary male ELSE calculate calorie intake for sedentary female',
    when: [
        (facts) => facts.newfact.bmiStatus == 'Underweight'|| facts.newfact.bmiStatus == 'Normal' || facts.newfact.bmiStatus == 'Overweight' ,
        (facts) => facts.user.exercise == 'Active',
        (facts) => facts.user.gender == 'Female',
      ],
    then: (facts) => {
        facts.newfact.calorieIntake = ((parseFloat(10) * parseFloat(facts.user.weight)) + (parseFloat(6.25) * parseFloat(facts.user.height)) - (parseFloat(5) * (facts.user.age) - parseFloat(161))) * 1.55;
    },
});

const RULE19 = new Rule({
    name: 'IF BMI is underweight OR BMI is normal OR BMI is overweight AND exercise is very active AND gender is female THEN calculate calorie intake for sedentary male ELSE calculate calorie intake for sedentary female',
    when: [
        (facts) => facts.newfact.bmiStatus == 'Underweight'|| facts.newfact.bmiStatus == 'Normal' || facts.newfact.bmiStatus == 'Overweight' ,
        (facts) => facts.user.exercise == 'Very Active',
        (facts) => facts.user.gender == 'Female',
      ],
    then: (facts) => {
        facts.newfact.calorieIntake = ((parseFloat(10) * parseFloat(facts.user.weight)) + (parseFloat(6.25) * parseFloat(facts.user.height)) - (parseFloat(5) * (facts.user.age) - parseFloat(161))) * 1.725;
    },
});

const RULE20 = new Rule({
    name: 'IF BMI is underweight OR BMI is normal OR BMI is overweight AND exercise is very active AND gender is female THEN calculate calorie intake for sedentary male ELSE calculate calorie intake for sedentary female',
    when: [
        (facts) => facts.newfact.bmiStatus == 'Underweight'|| facts.newfact.bmiStatus == 'Normal' || facts.newfact.bmiStatus == 'Overweight' ,
        (facts) => facts.user.exercise == 'Extremely Active',
        (facts) => facts.user.gender == 'Female',
      ],
    then: (facts) => {
        facts.newfact.calorieIntake = ((parseFloat(10) * parseFloat(facts.user.weight)) + (parseFloat(6.25) * parseFloat(facts.user.height)) - (parseFloat(5) * (facts.user.age) - parseFloat(161))) * 1.9;
    },
});

const RULE21 = new Rule({
    name: 'IF BMI is underweight AND need to increase calorie intake THEN calorie goals = calorie intake + 500',
    when: [
        (facts) => facts.newfact.bmiStatus == 'Underweight' ,
        (facts) => facts.newfact.do == 'You need to increase calorie intake' ,
      ],
    then: (facts) => {
        facts.result.conclusion = 'You are ' + facts.user.weight + 'kg ,'  +facts.user.height+ ' cm height and ' + facts.user.age + ' years old ' + facts.user.gender + '. Based on your BMI = ' + facts.newfact.bmi + ' , you are currently ' + facts.newfact.bmiStatus; 
        facts.newfact.caloriegoals = parseFloat(facts.newfact.calorieIntake) + parseFloat(500);
    },
});

const RULE22 = new Rule({
    name: 'IF BMI is normal AND need to maintain calorie intake THEN calorie goals = calorie intake',
    when: [
        (facts) => facts.newfact.bmiStatus == 'Normal' ,
        (facts) => facts.newfact.do == 'You need to maintain calorie intake' ,
      ],
    then: (facts) => {
        facts.result.conclusion = 'You are ' + facts.user.weight + 'kg ,'  +facts.user.height+ ' cm height and ' + facts.user.age + ' years old ' + facts.user.gender + '. Based on your BMI = ' + facts.newfact.bmi + ' , you are currently ' + facts.newfact.bmiStatus; 
        facts.newfact.caloriegoals = parseFloat(facts.newfact.calorieIntake) ;
        // facts.result.recommendation = `Since your BMI is ${facts.newfact.bmiStatus} , ${facts.newfact.do } . We recommend you to eat from ${facts.newfact.set } . These food contain ${facts.newfact.setCalorie } `;

    },
});

const RULE23 = new Rule({
    name: 'IF BMI is overweight AND need to decrease calorie intake THEN calorie goals = calorie intake - 500',
    when: [
        (facts) => facts.newfact.bmiStatus == 'Overweight' ,
        (facts) => facts.newfact.do == 'You need to cut calorie intake' ,
      ],
    then: (facts) => {
        facts.result.conclusion = 'You are ' + facts.user.weight + 'kg ,'  +facts.user.height+ ' cm height and ' + facts.user.age + ' years old ' + facts.user.gender + '. Based on your BMI = ' + facts.newfact.bmi + ' , you are currently ' + facts.newfact.bmiStatus; 

        facts.newfact.caloriegoals = parseFloat(facts.newfact.calorieIntake) - parseFloat(500) ;
    },
});

const RULE24 = new Rule({
    name: 'IF calorie goals < 1000 Kcal THEN Set A',
    when: [
        (facts) => facts.newfact.bmiStatus == 'Underweight' || facts.newfact.bmiStatus == 'Normal' || facts.newfact.bmiStatus == 'Overweight' ,
        (facts) => facts.newfact.caloriegoals < 1000,
      ],
    then: (facts) => {
        
        facts.newfact.set = 'Set A : Ayam , daging';
        facts.newfact.setCalorie = 'less than 1000 Kcal';
        if(facts.newfact.bmiStatus == 'Underweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }else if(facts.newfact.bmiStatus == 'Normal'){
            facts.result.recommendation = `Since your BMI is ${facts.newfact.bmiStatus} , ${facts.newfact.do } . We recommend you to eat from ${facts.newfact.set } . These food contain ${facts.newfact.setCalorie } `;
        }else if(facts.newfact.bmiStatus == 'Overweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }
        facts.result.explanation = 'With the given calorie goal , the food in set A can supply you with enough amount of calorie to maintain energy reservation while doing your routine exercise .'
    },
});

const RULE25 = new Rule({
    name: 'IF calorie goals >= 1000 Kcal AND calorie goals < 1500 Kcal THEN Set B',
    when: [
        (facts) => facts.newfact.bmiStatus == 'Underweight' || facts.newfact.bmiStatus == 'Normal' || facts.newfact.bmiStatus == 'Overweight' ,
        (facts) => facts.newfact.caloriegoals >= 1000 && facts.newfact.caloriegoals <1500,
      ],
    then: (facts) => {
        facts.newfact.set = 'Set B : Ayam , daging';
        facts.newfact.setCalorie = 'around 1000 to 1500 Kcal';
        if(facts.newfact.bmiStatus == 'Underweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }else if(facts.newfact.bmiStatus == 'Normal'){
            facts.result.recommendation = `Since your BMI is ${facts.newfact.bmiStatus} , ${facts.newfact.do } . We recommend you to eat from ${facts.newfact.set } . These food contain ${facts.newfact.setCalorie } `;
        }else if(facts.newfact.bmiStatus == 'Overweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }
        facts.result.explanation = 'With the given calorie goal , the food in set B can supply you with enough amount of calorie to maintain energy reservation while doing your routine exercise .'


    },
});

const RULE26 = new Rule({
    name: 'IF calorie goals >= 1500 Kcal AND calorie goals < 2000 Kcal THEN Set C',
    when: (facts) => facts.newfact.caloriegoals >= 1500 && facts.newfact.caloriegoals <2000,
    then: (facts) => {
        facts.newfact.set = 'Set C : Ayam , daging';
        facts.newfact.setCalorie = 'around 1500 to 2000 Kcal';
        if(facts.newfact.bmiStatus == 'Underweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }else if(facts.newfact.bmiStatus == 'Normal'){
            facts.result.recommendation = `Since your BMI is ${facts.newfact.bmiStatus} , ${facts.newfact.do } . We recommend you to eat from ${facts.newfact.set } . These food contain ${facts.newfact.setCalorie } `;
        }else if(facts.newfact.bmiStatus == 'Overweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }
        facts.result.explanation = 'With the given calorie goal , the food in set C can supply you with enough amount of calorie to maintain energy reservation while doing your routine exercise .'
    },
});

const RULE27 = new Rule({
    name: 'IF calorie goals >= 2000  Kcal AND calorie goals < 2500  Kcal THEN Set D',
    when: (facts) => facts.newfact.caloriegoals >= 2000 && facts.newfact.caloriegoals <2500 ,
    then: (facts) => {
        facts.newfact.set = 'Set D : Ayam , daging';
        facts.newfact.setCalorie = 'around 2000 to 2500 Kcal';
        if(facts.newfact.bmiStatus == 'Underweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }else if(facts.newfact.bmiStatus == 'Normal'){
            facts.result.recommendation = `Since your BMI is ${facts.newfact.bmiStatus} , ${facts.newfact.do } . We recommend you to eat from ${facts.newfact.set } . These food contain ${facts.newfact.setCalorie } `;
        }else if(facts.newfact.bmiStatus == 'Overweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }

        facts.result.explanation = 'With the given calorie goal , the food in set D can supply you with enough amount of calorie to maintain energy reservation while doing your routine exercise .'

    },
});

const RULE28 = new Rule({
    name: 'IF calorie goals >= 2500   Kcal AND calorie goals < 3000 Kcal THEN Set E',
    when: (facts) => facts.newfact.caloriegoals >= 2500  && facts.newfact.caloriegoals <3000  ,
    then: (facts) => {
        facts.newfact.set = 'Set E : Ayam , daging';
        facts.newfact.setCalorie = 'around 2500 to 3000 Kcal';
        if(facts.newfact.bmiStatus == 'Underweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }else if(facts.newfact.bmiStatus == 'Normal'){
            facts.result.recommendation = `Since your BMI is ${facts.newfact.bmiStatus} , ${facts.newfact.do } . We recommend you to eat from ${facts.newfact.set } . These food contain ${facts.newfact.setCalorie } `;
        }else if(facts.newfact.bmiStatus == 'Overweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }
        facts.result.explanation = 'With the given calorie goal , the food in set E can supply you with enough amount of calorie to maintain energy reservation while doing your routine exercise .'


    },
});

const RULE29 = new Rule({
    name: 'IF calorie goals >= 3000 Kcal AND calorie goals < 3500 Kcal THEN Set F',
    when: (facts) => facts.newfact.caloriegoals >= 3000  && facts.newfact.caloriegoals <3500   ,
    then: (facts) => {
        facts.newfact.set = 'Set F : Ayam , daging';
        facts.newfact.setCalorie = 'around 3000 to 3500 Kcal';    
        if(facts.newfact.bmiStatus == 'Underweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }else if(facts.newfact.bmiStatus == 'Normal'){
            facts.result.recommendation = `Since your BMI is ${facts.newfact.bmiStatus} , ${facts.newfact.do } . We recommend you to eat from ${facts.newfact.set } . These food contain ${facts.newfact.setCalorie } `;
        }else if(facts.newfact.bmiStatus == 'Overweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }
        facts.result.explanation = 'With the given calorie goal , the food in set F can supply you with enough amount of calorie to maintain energy reservation while doing your routine exercise .'

    },
});

const RULE30 = new Rule({
    name: 'IF calorie goals >= 3500 Kcal AND calorie goals < 4000 Kcal THEN Set G',
    when: (facts) => facts.newfact.caloriegoals >= 3500  && facts.newfact.caloriegoals <4000   ,
    then: (facts) => {
        facts.newfact.set = 'Set G : Ayam , daging';
        facts.newfact.setCalorie = 'around 3500 to 4000 Kcal';   
        if(facts.newfact.bmiStatus == 'Underweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }else if(facts.newfact.bmiStatus == 'Normal'){
            facts.result.recommendation = `Since your BMI is ${facts.newfact.bmiStatus} , ${facts.newfact.do } . We recommend you to eat from ${facts.newfact.set } . These food contain ${facts.newfact.setCalorie } `;
        }else if(facts.newfact.bmiStatus == 'Overweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }
        facts.result.explanation = 'With the given calorie goal , the food in set G can supply you with enough amount of calorie to maintain energy reservation while doing your routine exercise .'
 
    },
});

const RULE31 = new Rule({
    name: 'IF calorie goals >= 4000  Kcal AND calorie goals < 4500  Kcal THEN Set H',
    when: (facts) => facts.newfact.caloriegoals >= 4000  && facts.newfact.caloriegoals <4500   ,
    then: (facts) => {
        facts.newfact.set = 'Set H : Ayam , daging';
        facts.newfact.setCalorie = 'around 4000 to 4500 Kcal';   
        if(facts.newfact.bmiStatus == 'Underweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }else if(facts.newfact.bmiStatus == 'Normal'){
            facts.result.recommendation = `Since your BMI is ${facts.newfact.bmiStatus} , ${facts.newfact.do } . We recommend you to eat from ${facts.newfact.set } . These food contain ${facts.newfact.setCalorie } `;
        }else if(facts.newfact.bmiStatus == 'Overweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }
        facts.result.explanation = 'With the given calorie goal , the food in set H can supply you with enough amount of calorie to maintain energy reservation while doing your routine exercise .'

    },
});

const RULE32 = new Rule({
    name: 'IF calorie goals >= 4500 Kcal THEN Set I',
    when: (facts) => facts.newfact.caloriegoals >= 4500 ,
    then: (facts) => {
        facts.newfact.set = 'Set i : Ayam , daging';
        facts.newfact.setCalorie = 'more than 4500 Kcal';  
        if(facts.newfact.bmiStatus == 'Underweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }else if(facts.newfact.bmiStatus == 'Normal'){
            facts.result.recommendation = `Since your BMI is ${facts.newfact.bmiStatus} , ${facts.newfact.do } . We recommend you to eat from ${facts.newfact.set } . These food contain ${facts.newfact.setCalorie } `;
        }else if(facts.newfact.bmiStatus == 'Overweight'){
            facts.result.recommendation = 'Since you are ' + facts.newfact.bmiStatus + ' , ' + facts.newfact.do + ' . To achieve normal BMI , your new weight goal is ' + facts.newfact.weightToAchieve + 'kg . For the solution , we would advise you to take ' + facts.newfact.caloriegoals + ' Kcal per day for ' + facts.newfact.dayToReach + ' days to achieve normal BMI. We recommend you to eat from ' + facts.newfact.set +  ' . These food contain ' + facts.newfact.setCalorie ;
        }
        facts.result.explanation = 'With the given calorie goal , the food in set I can supply you with enough amount of calorie to maintain energy reservation while doing your routine exercise .'
 
    },
});

const calculateWeightToAchieveForUnderweight = new Rule({
    name: 'Calculate weight to achieve for underweight',
    when: (facts) => facts.newfact.bmiStatus == 'Underweight' ,
    then: (facts) => {
        facts.newfact.weightToAchieve = parseFloat(18.5 * (parseFloat(facts.user.height/100) * parseFloat(facts.user.height/100))).toFixed(2);
        facts.newfact.dayToReach = parseInt((parseFloat(facts.newfact.weightToAchieve) - parseFloat(facts.user.weight) )* parseInt(7700) / 500);
    },
});

const calculateWeightToAchieveForOverweight = new Rule({
    name: 'Calculate weight to achieve',
    when: (facts) => facts.newfact.bmiStatus == 'Overweight' ,
    then: (facts) => {
        facts.newfact.weightToAchieve = parseFloat(25 * (parseFloat(facts.user.height/100) * parseFloat(facts.user.height/100))).toFixed(2);
        facts.newfact.dayToReach = parseInt((parseFloat(facts.user.weight) - parseFloat(facts.newfact.weightToAchieve) )* parseInt(7700) / 500);    
    },
});




//eval
const evaluation = async () => {
    const rools = new Rools()

    try {
        await rools.register([calculateWeightToAchieveForUnderweight,calculateWeightToAchieveForOverweight,calculateBMI ,RULE1 ,RULE2, RULE3, RULE4, RULE5,RULE6,RULE7,RULE8, RULE9,RULE10,RULE11, RULE12, RULE13,RULE14, RULE15, RULE16, RULE17,RULE18,RULE19,RULE20,RULE21,RULE22,RULE23,RULE24,RULE25,RULE26,RULE27,RULE28,RULE29,RULE30,RULE31,RULE32 ]);
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
    // console.log(facts.calculate.activeness);
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

module.exports = { finalresult }