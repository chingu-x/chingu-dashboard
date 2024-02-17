import React from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Label from "./Label";
import FieldMessage from "./FieldMessage";

import { cn } from "@/lib/utils";

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
      <div className="flex flex-col w-full pr-2 ml-1">
        <Label htmlFor={id}>{label}</Label>
        <DatePicker
          id={id}
          placeholderText={placeholder}
          selected={selectedValue}
          showTimeSelect
          filterTime={filterPassedTime}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeIntervals={15}
          className={cn(
            "w-full my-2 text-base outline-none rounded-lg border px-3.5 py-2.5 shadow-transparent shadow-[0px_0px_0px_3px] bg-base-200 text-neutral-focus disabled:cursor-not-allowed border-neutral/40 focus-visible:shadow-neutral/30",
            errorMessage && "border-error focus-visible:shadow-error/30",
            className,
          )}
          ref={ref}
          {...props}
        />
        <FieldMessage
          id={`${id}-message`}
          errorMessage={errorMessage && errorMessage}
          suggestionMessage=""
        />
      </div>
    );
  },
);

DateTimePicker.displayName = "DateTimePicker";

export default DateTimePicker;
