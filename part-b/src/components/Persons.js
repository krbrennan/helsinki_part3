import React from 'react'

import Person from './Person'

const Persons = (props) => { 
  // console.log(props)   
    if(props.filtered.length === 0) {
      return(
        <div>
          <ul>
            {props.people.map((person, idx) => {
            return <Person delete={props.deletePerson} info={person} />
          })}
          </ul>
        </div>
      )
    } else {
        return(
          <div>
             <ul>
            {props.filtered.map((person, idx) => {
                return <li><Person delete={props.deletePerson} info={person} /></li>
              })}
          </ul>
          </div>
        )
    }
}

export default Persons