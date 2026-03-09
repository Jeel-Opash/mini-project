import React, { useState } from "react";
import { MdOutlineDateRange, MdClose } from "react-icons/md";
import { DayPicker } from "react-day-picker";
import moment from "moment";
import "./DateSelector.css";

interface DateSelectorProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ date, setDate }) => {
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

  return (
    <div className="date-selector">
      <button className="date-btn" onClick={() => {
          setOpenDatePicker(true);}}>
        <MdOutlineDateRange className="icon" />
        {date ? moment(date).format("Do MMM YYYY") : moment().format("Do MMM YYYY")}
      </button>

      {openDatePicker && (
        <div className="date-picker-popup">
        <DayPicker className="day-picker" mode="single"
          selected={date ?? undefined} 
          onSelect={(selectedDate: Date | undefined) => {
            setDate(selectedDate ?? null); }}/>

          <button className="close-btn" onClick={() => {
            setOpenDatePicker(false);}}>
          <MdClose />
        </button>
        </div>
      )}
    </div>
  );
};

export default DateSelector;