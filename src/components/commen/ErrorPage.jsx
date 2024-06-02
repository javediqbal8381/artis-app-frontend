import { Button } from '@mui/material'
import React from 'react'

const ErrorPage = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex flex-col gap-5 items-center justify-center'>
        <p> ------- Opps, Something went Wrong ------ </p>
        <Button className='normal_btn' onClick={() => window.location.reload()}>
            Click Here to Reload
        </Button>
        <p>If the issue persists please check your Url.</p>
    </div>
  )
}

export default ErrorPage