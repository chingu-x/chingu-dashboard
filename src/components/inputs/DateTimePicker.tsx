"use client";

import React from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { CalendarDaysIcon, CalendarIcon } from "@heroicons/react/24/outline";

import "react-datepicker/dist/react-datepicker.css";

import Label from "./Label";
import FieldMessage from "./FieldMessage";

import { cn } from "@/lib/utils";

export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  errorMessage?: string | undefined;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ id, label, errorMessage, className, ...props }, ref) => (
    <div className="w-full pr-2 ml-1">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative my-2">
        <input
          id={id}
          aria-describedby={`${id}-message`}
          className={cn(
            "transition border-2 peer w-full outline-none rounded-lg px-3.5 py-2.5 pl-[56px] shadow-transparent shadow-[0px_0px_0px_3px] bg-base-200 text-neutral-focus disabled:cursor-not-allowed border-neutral/40 hover:border-neutral-focus focus-visible:border-neutral/40 focus-visible:shadow-neutral/30 disabled:bg-base-100 disabled:hover:border-neutral/40",
            errorMessage && "border-error focus-visible:shadow-error/30",
            className
          )}
          ref={ref}
          {...props}
        />
        {/* FIXED LEFT INPUT GROUP */}
        <div className="top-1/2 -translate-y-1/2 left-[2px] rounded-l-md bg-neutral peer-disabled:bg-neutral-content [&>*]:text-base-200 peer-hover:[&>*]:text-base-200 peer-focus-visible:[&>*]:text-base-200 peer-disabled:peer-hover:[&>*]:text-base-200 h-[calc(100%-4px)] py-3 transition absolute peer-disabled:peer-focus-visible:[&>*]:text-neutral [&>*]:mx-[14px] [&>*]:w-5 [&>*]:h-5">
          <CalendarDaysIcon />
        </div>
      </div>
    </div>
  )
);

CustomInput.displayName = "CustomInput";

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
    ref
  ) => {
    const filterPassedTime = (time: Date) => {
      const currentDate = new Date();
      const selectedDate = new Date(time);
      return currentDate.getTime() < selectedDate.getTime();
    };
    return (
      <div className="flex flex-col w-full pr-2 ml-1">
        <DatePicker
          id={id}
          selected={selectedValue}
          placeholderText={placeholder}
          showTimeSelect
          filterTime={filterPassedTime}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeIntervals={15}
          customInput={
            <CustomInput
              id={id}
              label={label}
              errorMessage={errorMessage}
              className={className}
            />
          }
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
  }
);

DateTimePicker.displayName = "DateTimePicker";

export default DateTimePicker;
