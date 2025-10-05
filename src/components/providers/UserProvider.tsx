"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { getUserState } from "@/store/features/user/userSlice";
import type { User } from "@/store/features/user/userSlice";

function UserProvider({
    user,
    mockDate,
}: {
    user: User | null;
    mockDate?: Date;
}) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user) {
            dispatch(getUserState({ ...user, currentDate: mockDate || null }));
        }
    }, [user, mockDate, dispatch]);

    return null;
}

export default UserProvider;
