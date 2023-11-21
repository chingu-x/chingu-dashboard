"use client";

import Avatar from "@/components/Avatar";
import Bell from "@/components/navbar/Bell";
import DropDown from "@/components/navbar/DropDown";
import { useAppSelector } from "@/store/hooks";

const name = "Yorick";
const notificationCount = 4;

export default function AvatarContainer() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div className="flex flex-row items-center px-2 ml-6">
      {isAuthenticated ? (
        <>
          <Bell notificationCount={notificationCount} />
          <Avatar image="/img/avatar.png" height={34} width={34} />
          <DropDown name={name} />
        </>
      ) : null}
    </div>
  );
}
