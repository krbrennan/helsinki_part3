const express = require('express')
const app = express()
const cors = require('cors')

const Person = require('./models/person')

app.use(express())
app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
  
app.use(requestLogger)


app.get('/', async (req, res, next) => {
    await Person.find({})
        .then((people) => {
            return res.json(people)
        })
        .catch((err) => {
            next(err)
        })
})


// GET specific user by their ObjectId
app.get('/api/persons/:id', async (req, res, next) => {
    const idToFind = req.params.id
    // const objId = ObjectId(idToFind) 
    await Person.findById(idToFind).then((result) => {
        if(result.length !== 0){
            return res.json(result) 
        } else {
            return res.status(404).end()
        }
    }).catch((err) => { 
        next(err)
    })
})





// create new entry
app.post('/api/persons', async (req, res, next) => {
    const newPerson = new Person({
        name: req.body.name,
        number: req.body.number
    })
    await newPerson.save().then((result) => {
        console.log('person saved')
        return res.json(result)
        // mongoose.connection.close()
    })
        .catch(err => {
            console.log('error boiiiiiiii', err.message)
            next(err)
        })
})





app.delete('/api/persons/:id', (req, res, next) => {
    const userId = req.params.id

    Person.findByIdAndDelete(userId, (err, docs) => {
        if(docs === null){
            return res.status(404).send({error: 'Cannot find user'})
        } else {
            console.log('Deleted: ', docs)
            return res.json(docs)
        }
    }).catch(err => next(err))
})



// Update user number

app.put('/api/persons/:id', async (req, res, next) => {
    //  // // // // // // // // // // // // // // // // // // // // //
    // This method returns null if the task couldn't be completed // //
    //  // // // // // // // // // // // // // // // // // // // // //
    const userId = req.params.id
    const updatedPerson = {
        name: req.body.name,
        number: req.body.number
    }

    // await Person.findByIdAndUpdate(userId, updatedPerson).then((updatedProfile) => {
    //     return res.json(updatedPerson)
    // }).catch(err => next(err))


    await Person.findByIdAndUpdate(userId, updatedPerson)
        .then((newPersonObj) => {
            if(newPersonObj === null) {
                return res.status(404).send({error: 'cannot find user'})
                // return next('noFind')
            } else {
                res.json(updatedPerson)
            }
        })
        .catch(err => {
            console.log('inside catch block')
            next(err)
        })
})


// // // // // // // // // //
// error handler middleware //
// // // // // // // // // // 

const errorHandler = (error, request, response, next) => {
    console.log('error message:  ', error.message)
    console.log('error name:  ', error.name)

    switch(error.name){
    case  'CastError':
        return response.status(400).send({error: 'malformed Id'}) 
    case 'TypeError':
        return response.status(400).send({ error: 'Invalid user Id'})
    case 'noFind':
        return response.status(400).send({ error: 'Cannot find User'})
    case 'ValidationError':
        return response.status(400).send({ error: 'Name must be unique'})
    default:
        return next(error)
        // return response.status(400).send({ error: error})
    }
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})