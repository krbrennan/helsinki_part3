import React, { useState, useEffect } from 'react'

// Import API service functions
import apiService from './services/numbers'

// component imports
import Persons from './components/Persons'
import Filter from './components/Filter'
import Form from './components/Form'
import ErrorMessage from './components/ErrorMessage'


const App = () => {
  // const [ persons, setPersons ] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ]) 

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  const [ searchName, setSearchName ] = useState('')
  const [ filteredNames, setFilteredNames] = useState([])

  const [ errorMessage, setErrorMessage ] = useState('')




  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  const nameTaken = (name) => {
    // search persons, if this name is already in persons return true, else return false
    let alreadyExists = false

    persons.forEach((person) => {
      if(person.name.includes(name)){
        alreadyExists = true
      }
    })
    return alreadyExists
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  


  // search Names
  const handleFilterChange = (event) => {
      // needs access to persons
      setSearchName(event.target.value)
  }

  const submitSearch = (event) => {
    event.preventDefault()
    setSearchName(searchName)

    const filtered = persons.filter((person) => {
      return person.name.toLowerCase().includes(searchName)
    })

    setFilteredNames(filtered)
  }



  const putNewNumber = (person, newObj) => {
  // need to send person ID and the new Object
    const personObject = persons.filter((personObj) => {
      if(personObj.name == person){
        return personObj
      }
    })
    // console.log(personObject)
    // console.log(personObject[0])
    apiService.updateNumber(personObject[0].id, newObj).then((res) => {
      // console.log(res)
      setPersons(persons.map((person) => {
        // console.log(person)
        return person.id !== res.id ? person : res
      }))
    })
    // then need to update person object in local state
    apiService.getAll()
      .then(res => setPersons(res))
    
  }


  const newErrorMessage = (type, name) => {
    console.log(type)
    // setMessage if new person added to say "Added ${name}"
    // setMessage if existing person's number was changed to "Changed ${name}'s phone number"
    type == 'new' ? setErrorMessage(`Added ${name}`) : setErrorMessage(`${name}'s number changed!`)
  }



  const submitName = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if(nameTaken(newName, persons)) {
      // PUT new info onto server 
      putNewNumber(newName, newPerson)

      newErrorMessage('update', newPerson.name)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      apiService.getAll()
        .then(res => setPersons(res))

      // return alert(`${newName} is already taken!`)
    } else {  
      apiService.create(newPerson).then((res) => {
        // console.log(res.data)
        setPersons(oldArray => [...oldArray, res.data])
      })


      newErrorMessage('new', newPerson.name)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)


      // setPersons(oldArray => [...oldArray, newPerson])
      // POST to server, update setPersons with response
      setNewNumber('')
      setNewName('')

      apiService.getAll()
      .then(res => setPersons(res))
    }
  }



  const deletePerson = (props) => {
    // console.log(`PROPSSSSSS:      ${props}`)
    // find person first, capture their object, then send apiService(object)
    const personToDelete = persons.filter((person) => {
      return person.name == props
    })

    console.log(personToDelete[0])
    // update persons by removing this deleted person
    apiService.personToDelete(personToDelete[0]).then((res) => {
      console.log(res)
      // manually delete entry in current state
      // res.data is an array of people
      setPersons(res.data)

      // const newPersons = persons.filter((person) => {
      //   if(person.name !== res.name){
      //     return person
      //   }
      // })
      // setPersons(newPersons)
    })
    .catch((error) => {
      // console.log(error.response.status)
      if(error.response.status == 404) {
        setErrorMessage(`Information for ${props} has already been removed from the server`)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        apiService.getAll()
        .then(res => setPersons(res))
      }
    })
  }


  // 
  // 
  // 
  // 
  useEffect(() => {
    // apiService.getAll().then(res => setPersons(res))
    apiService.getAll()
      .then(res => setPersons(res))
  }, [])



  return (
    <div>
      <div className='top-div'>
        <h1 className='title'>Phonebook</h1>
        <ErrorMessage message={errorMessage} />
      </div>
        <Filter submitSearch={submitSearch} onTextChange={handleFilterChange} />
        <Form 
          submitName={submitName} 
          handleNameChange={handleNameChange} 
          handleNumberChange={handleNumberChange}  
          number={newNumber} 
          name={newName}
          />
      <h2>Numbers:</h2>
        <Persons people={persons} deletePerson={deletePerson} filtered={filteredNames} />
      ...
    </div>
  )
}


export default App