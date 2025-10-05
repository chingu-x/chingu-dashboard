"use client";

import { useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { clientSignIn, clientSignOut } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { type User, getUserState } from "@/store/features/user/userSlice";
import { type AppError } from "@/types/types";

interface AuthProviderProps {
    user: User | null;
    error: AppError | null;
}

export default function AuthProvider({ user, error }: AuthProviderProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user) {
            dispatch(clientSignIn());

            // Check for mock date in URL
            const urlParams = new URLSearchParams(window.location.search);
            const mockDateParam = urlParams.get("mockDate");

            let currentDate;
            if (mockDateParam) {
                // Create date that will become the correct date after Redux serialization
                // Since Redux converts to midnight UTC, we need to add the timezone offset
                const [year, month, day] = mockDateParam.split("-").map(Number);
                const timezoneOffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
                currentDate = new Date(year, month - 1, day, 0, 0, 0);
                currentDate = new Date(currentDate.getTime() + timezoneOffset);
            } else {
                const currentDateInUserTimezone = formatInTimeZone(
                    new Date(),
                    user.timezone,
                    "yyyy-MM-dd HH:mm:ss",
                );
                currentDate = new Date(currentDateInUserTimezone);
            }

            const userWithDate = {
                ...user,
                currentDate,
                // Don't override timezone - let it use the original user timezone
            };
            dispatch(getUserState(userWithDate));
        }

        if (error) {
            dispatch(clientSignOut());
        }
    }, [dispatch, user, error]);

    return null;
}
