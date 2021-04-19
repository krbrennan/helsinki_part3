import React from 'react'
import  '../index.css'

const ErrorMessage = (props) => {
    console.log('erorroror props', props.message)
    // props.message.err
    // props.message.message

    if(props.message == '') {
        return(
            <div className='errorDiv' />
        )
    } else {
        if(props.message.err == 'err'){
            return(
                <div className='errorDiv'>
                    <h4 className='errorMessage'>{props.message.message}</h4>
                </div>
            )   
        } else {
            return(
                <div className='successDiv'>
                    <h4 className='successMessage'>{props.message.message}</h4>
                </div>
            )   
        }
       
    }
}


export default ErrorMessage
