import { useState } from 'react';

const daysShortArr = [
  'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];

const monthNamesArr = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

const useCalendar = (daysShort = daysShortArr, monthNames = monthNamesArr) => {
  const today = new Date();
  const todayFormatted = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  const daysInWeek = [0,1, 2, 3, 4, 5, 6];
  const [selectedDate, setSelectedDate] = useState(today);
  const selectedMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  const prevMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0);
  const daysInMonth = selectedMonthLastDate.getDate();
  const firstDayInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const startingPoint = daysInWeek.indexOf(firstDayInMonth) + 1;
  let prevMonthStartingPoint = prevMonthLastDate.getDate() - daysInWeek.indexOf(firstDayInMonth) + 1;
  let currentMonthCounter = 1;
  let nextMonthCounter = 1;
  const rows = 6;
  const cols = 7;
  const calendarRows = {};

  for(let i = 1; i < rows + 1; i++) {
    for(let j = 1; j < cols + 1; j++) {
      if(!calendarRows[i]) {
        calendarRows[i] = [];
      }

      if(i === 1) {
        if(j < startingPoint) {
          calendarRows[i] = [...calendarRows[i], {
            classes: 'in-prev-month',
            date: `${prevMonthStartingPoint}-${selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth()}-${selectedDate.getMonth() === 0 ? selectedDate.getFullYear() - 1 : selectedDate.getFullYear()}`,
            day: prevMonthStartingPoint,
            month:selectedDate.getMonth()+1,
            year:selectedDate.getFullYear()
          }];
          prevMonthStartingPoint++;
        }else {
          calendarRows[i] = [...calendarRows[i], {
            classes: '',
            date: `${currentMonthCounter}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`,
            day: currentMonthCounter,
            month:selectedDate.getMonth()+1,
            year:selectedDate.getFullYear()
          }];
          currentMonthCounter++;
        }
      }else if( i > 1 && currentMonthCounter < daysInMonth + 1 ) {
        calendarRows[i] = [...calendarRows[i], {
          classes: '',
          date: `${currentMonthCounter}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`,
          day: currentMonthCounter,
          month:selectedDate.getMonth()+1,
          year:selectedDate.getFullYear()
        }];
        currentMonthCounter++;
      }else {
        calendarRows[i] = [...calendarRows[i], {
          classes: 'in-next-month',
          date: `${nextMonthCounter}-${selectedDate.getMonth() + 2 === 13 ? 1 : selectedDate.getMonth() + 2}-${selectedDate.getMonth() + 2 === 13 ? selectedDate.getFullYear() + 1 : selectedDate.getFullYear()}`,
          day: nextMonthCounter,
          month:selectedDate.getMonth()+1,
          year:selectedDate.getFullYear()
        }];
        nextMonthCounter++;
      }
    }
  }

  const getPrevMonth = () => {
    setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, 1));
  }

  const getNextMonth = () => {
    setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1));
  }
  const updateYear=(newYear)=>{
    setSelectedDate(new Date(newYear,new Date().getMonth(),new Date().getDate()))
  }
  const updateMonth=(newMonth)=>{
    setSelectedDate(new Date(new Date().getFullYear(),newMonth))
  }

  return {
    daysShort,
    monthNames,
    todayFormatted,
    calendarRows,
    selectedDate,
    getPrevMonth,
    getNextMonth,
    updateYear,
    updateMonth
  }
}

export default useCalendar;