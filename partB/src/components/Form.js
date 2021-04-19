import React from 'react'

const Form = (props) => {
    return (
        <form onSubmit={props.submitName}>
        <h2>Add a new Contact</h2>
        <div>
          name: <input onChange={props.handleNameChange} value={props.name}/>
        </div>
        <div>number: <input onChange={props.handleNumberChange} value={props.number} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}


export default Form