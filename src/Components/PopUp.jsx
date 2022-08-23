import React from 'react';
import Calendar from './Calendar';
import './Calendar.css'

const PopUp = () => {
  return (
    <div className='back-blur'>
        <div className="container">
            <Calendar/>
        </div>
    </div>
  )
}

export default PopUp