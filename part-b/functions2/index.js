const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const baseUrl = 'https://helsinki-phonebook-backend.herokuapp.com'

let people = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 0
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 1
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 2
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 3
    }
]


app.get('/', (req, res) => {
  return res.send(people)
})

app.post(`/api/persons`, (req, res) => {
  const length = people.length
  const person = {
    "name": req.body.name,
    "number": req.body.number,
    "id": length
  } 
  people.push(person)
  return res.send(people)
})

app.delete(`/api/persons/:id`, (req, res) => {
  // console.log(req.params)
  const toDelete = req.params.id
  // console.log(typeof toDelete)
  people = people.filter(person => person.id !== Number(toDelete))
  // res.sendStatus(201)
  // console.log(people)
  res.send(people)
})

// app.listen(3001, () => console.log(`server is running on port 3001!`))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})