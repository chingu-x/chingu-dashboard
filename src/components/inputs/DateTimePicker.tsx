"use client";

import React from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

import "react-datepicker/dist/react-datepicker.css";

import TextInput from "./TextInput";

export interface DatePickerInputProps extends ReactDatePickerProps {
  id: string;
  label: string;
  selectedValue: Date;
  placeholder: string;
  errorMessage?: string | undefined;
}

const DateTimePicker = React.forwardRef<DatePicker, DatePickerInputProps>(
  (
    {
      id,
      label,
      selectedValue,
      placeholder,
      errorMessage,
      className,
      ...props
    },
    ref,
  ) => {
    const filterPassedTime = (time: Date) => {
      const currentDate = new Date();
      const selectedDate = new Date(time);
      return currentDate.getTime() < selectedDate.getTime();
    };
    return (
      <div className="flex flex-col w-full">
        <DatePicker
          id={id}
          selected={selectedValue}
          placeholderText={placeholder}
          showTimeSelect
          filterTime={filterPassedTime}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeIntervals={15}
          popperClassName="ml-1"
          popperPlacement="bottom-start"
          customInput={
            <TextInput
              id={id}
              label={label}
              placeholder=""
              inputGroupContent={<CalendarDaysIcon />}
              errorMessage={errorMessage}
              className={className}
            />
          }
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

DateTimePicker.displayName = "DateTimePicker";

export default DateTimePicker;
