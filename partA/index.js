const express = require('express')
// Middleware
const morgan = require('morgan')

const app = express()

app.use(express.json())

// Middleware entry
// app.use(morgan('tiny'))
// app.use(morgan(function (tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, 'content-length'), '-',
//       tokens['response-time'](req, res), 'ms'
//     ].join(' ')
//   }))

// morgan tokens
morgan.token('body', (req, res) => JSON.stringify(req.body));

let people = [
          {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": 1
          },
          {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": 2
          },
          {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 3
          },
          {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": 4
          }
]

app.get('/api/persons', (req, res) => {
    res.send(JSON.stringify(people))
})

app.get('/info', (req, res) => {
    const peopleLength = people.length
    const date = new Date()

    res.send(`Phonebook has info for ${peopleLength} people <br /><br /> ${date}`)
})



app.get(`/api/persons/:id`, (req, res) => {
    const id = req.params.id
    const person = people.find(person => person.id == id)

    if(person){
        res.send(JSON.stringify(person))
    } else {
        res.status(400).send('ERROR, person not found!')
    }
})



app.post(`/api/persons`, (request, response) => {

    const newId = Math.floor(Math.random() * 1000)
    // return res.status(404).error('invalid whatever') if:
        // name or number is missing
        // name already exists in phonebook
    const name = request.body.name
    const number = request.body.number

    let personInfo = {
        "id": newId,
        "name": name,
        "number": number
    }

    if(people.find(person => (person.name == name) || (person.number == number))){
        return response.status(404).send({error: 'Person already exists!'})
    } else {
        people.push(personInfo)
        return response.status(201).send('Person successfully added!')
    }
})



app.delete(`/api/persons/:id`, (req, res) => {
    const id = req.params.id

    people = people.filter(person => person.id !== id)
    // people = people.map((person) => {
    //     if(person.id !== id){
    //         return person
    //     } 
    // })
    res.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})
