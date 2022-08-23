import React, { Fragment,useEffect,useState } from 'react';
import './Calendar.css'
import useCalendar from '../hooks/useCalendar';

const Calendar = () => {
  const { calendarRows,  daysShort, monthNames,updateYear,updateMonth } = useCalendar();
  
  const today = new Date()
  const todaysDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  

  const [requiredDate,setRequiredDate] = useState(todaysDate)
  let AllYears=[];
  for(let i=new Date().getFullYear();i>=(new Date().getFullYear()-60);i--){
    AllYears.push(i)
  }

  const dateClickHandler = data => {
    // console.log(data);
    setRequiredDate(data.date)
  }

  return(
    <Fragment>
      <p>Selecte Date of Birth</p>
      {/* <p>{requiredDate}</p> */}
      <div className="displaying">
        <span className="cont">
          <select name="month" onChange={(event)=>updateMonth(event.target.value)}>
            <option value="">{monthNames[today.getMonth()]}</option>
            {monthNames.map((row,index)=>{
              return <option key={index} value={index}>{row}</option>
            })}
          </select>
        </span>
        <span className="cont">
        <select name="year" onChange={(event)=>updateYear(event.target.value)}>
            {AllYears.map((row,index)=>{
              return <option key={index} value={row}>{row}</option>
            })}
          </select>
        </span>
      </div>
      <table className="table">
        <thead>
          <tr>
            {daysShort.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            Object.values(calendarRows).map(cols => {
              return <tr key={cols[0].date}>
                
                {cols.map(col => (
                  <td key={col.date} className={"each-day "+(col.classes)+(col.date===requiredDate?" today":"")} onClick={() => dateClickHandler(col)}>{col.day}</td>
                ))}
              </tr>
            })
          }
        </tbody>
      </table>

      {/* <div className='btns'>
        <button className="button" onClick={getPrevMonth}>{selectedDate.getMonth()===0?monthNames[monthNames.length-1]:(monthNames[selectedDate.getMonth()-1])}</button>
        <button className="button" onClick={getNextMonth}>{(selectedDate.getMonth()===11?monthNames[0]:monthNames[selectedDate.getMonth()+1])}</button>
      </div> */}
    </Fragment>
  );
}

export default Calendar;