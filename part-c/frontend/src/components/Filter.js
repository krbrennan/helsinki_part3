import React from 'react'

const Filter = (props) => {
    return(
        <form onSubmit={props.submitSearch}>
          Lookup a name:  <input onChange={props.onTextChange} />
        </form>
    )
}

export default Filter
