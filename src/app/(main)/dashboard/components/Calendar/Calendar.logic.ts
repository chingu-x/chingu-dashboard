import { useEffect, useMemo, useState } from "react";

import {
    startOfMonth,
    endOfMonth,
    getDay,
    getDate,
    getMonth,
    getYear,
    addMonths,
    subDays,
} from "date-fns";
import { useUser } from "@/store/hooks";

export const useCalendarLogic = () => {
    const { currentDate } = useUser();
    // const today = useMemo(() => currentDate ?? new Date(), [currentDate]);

    // Fix the date if it's been shifted by Redux serialization
    const today = useMemo(() => {
        if (!currentDate) return new Date();

        // Check if this looks like a mock date (midnight UTC)
        const urlParams = new URLSearchParams(window.location.search);
        const mockDateParam = urlParams.get("mockDate");

        if (
            mockDateParam &&
            currentDate.toISOString().endsWith("T00:00:00.000Z")
        ) {
            // This is a mock date that got converted to midnight UTC
            // Convert it back to the intended local date
            const [year, month, day] = mockDateParam.split("-").map(Number);
            return new Date(year, month - 1, day, 12, 0, 0);
        }

        return currentDate;
    }, [currentDate]);
    const [date, setDate] = useState<Date>(today);
    const [selectedDate, setSelectedDate] = useState<Date>(today);
    useEffect(() => {
        if (today) {
            setDate(today);
            setSelectedDate(today);
        }
    }, [today]);

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const generateDates = (
        month = getMonth(new Date()),
        year = getYear(new Date()),
    ) => {
        const firstDateOfMonth = startOfMonth(new Date(year, month));
        const lastDateOfMonth = endOfMonth(new Date(year, month));

        const arrayOfDate = [];

        // Create prefix date
        let firstDayOfWeek = getDay(firstDateOfMonth);
        while (firstDayOfWeek > 0) {
            const date = subDays(firstDateOfMonth, firstDayOfWeek);
            arrayOfDate.unshift({
                isWithinSelectedMonth: false,
                date,
            });
            firstDayOfWeek--;
        }
        arrayOfDate.reverse();

        // Generate current date
        for (let i = 1; i <= getDate(lastDateOfMonth); i++) {
            const date = new Date(year, month, i);
            arrayOfDate.push({
                isWithinSelectedMonth: true,
                date,
            });
        }

        const remaining = 42 - arrayOfDate.length;

        for (let i = 1; i <= remaining; i++) {
            arrayOfDate.push({
                isWithinSelectedMonth: false,
                date: new Date(year, month + 1, i),
            });
        }

        return arrayOfDate;
    };

    // Handle arrow click (previous/next month)
    const handleArrowClick = (month: number) => {
        if (date) setDate(addMonths(date, month));
    };

    return {
        generateDates,
        weekdays,
        today,
        date,
        setDate,
        selectedDate,
        setSelectedDate,
        onArrowClick: (month: number) => handleArrowClick(month),
    };
};
