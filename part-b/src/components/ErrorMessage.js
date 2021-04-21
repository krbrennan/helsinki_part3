import React from 'react'
import  '../index.css'

const ErrorMessage = (props) => {
    console.log(props)
    if(props.message == '') {
        return(
            <div className='errorDiv' />
        )
    } else {
        return(
            <div className='errorDiv'>
                <h4 className='errorMessage'>{props.message}</h4>
            </div>
        )   
    }
}


export default ErrorMessage
