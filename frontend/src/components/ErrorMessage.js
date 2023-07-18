import React from 'react'
import { Alert } from 'react-bootstrap'

const ErrorMessage = ({ variant = 'info', children }) => {
    return (
        <Alert variant={variant} className='text-center'>
            <strong>{children}</strong>
        </Alert>
    )
}

export default ErrorMessage
