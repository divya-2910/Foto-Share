import React from 'react';
import {Grid} from 'react-loader-spinner';

const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
    <Grid 
    type = "Circles"
    color = "#4fa94d"
    ariaLabel="grid-loading"
    height="60"
    width="60"
    className = "m-5"
    />
    <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner