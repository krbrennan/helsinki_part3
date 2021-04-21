import React from 'react'

const Person = (props) => {
    // console.log(props)
    return(
        <div>
            <p key={props.info.name}>{props.info.name}    {props.info.number} </p>
            <button onClick={() => props.delete(props.info.name)}>Delete</button>
        </div>
    )
}

export default Person