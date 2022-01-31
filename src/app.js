const express = require('express')
const app = express()
const hbs = require('hbs')

const path = require('path')
const viewLocation = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public/')

// console.log(publicPath)
//.use for public, .set for template, views
app.use(express.static(publicPath))
app.set('view engine', 'hbs')
app.set('views', viewLocation)

const partials = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partials)

const expert = require('./utils/working_memory')

app.get('/', (req, res) => {
    res.render('homepage')
})
app.get('/evaluate', (req, res) => {
    res.render('evaluate')
})


app.get('/evaluation', async (req, res) => {
    try {
        const values = {
            gender: req.query.gender,
            weight: JSON.parse(req.query.weight),
            height: JSON.parse(req.query.height),
            age: JSON.parse(req.query.age),
            exercise: JSON.parse(req.query.exercise),
        }
        console.log(values);


        const { gender, weight, height, age, exercise } = values

        // if (!dp || !s1 || !s2 || !s3 || !s4 || !s5 || !s6 || !s7 || !s8 || !s9 || !s10 || !fpg || !gthae) {
        //     return res.send({ error: 'you have to ake sure that the query string is correct' })
        // }

        console.log(values)

        //const result = await expert.finalresult(true, 300, 400, false, false, false, false, false, false, false, false, false, false)
        const result = await expert.finalresult(gender, weight, height, age, exercise)

        return res.json(result)
    } catch (error) {
        return console.log(error)
    }
})

//fr example
app.get('/evaluationn', async (req, res) => {
    const result = await expert.finalresult('Male', 80, 165, 21, 1)
    //return console.log(result)
    return res.json(result)
})


const port = process.env.PORT || 6969

app.listen(port, () => {
    console.log('port listen ', port)
})
