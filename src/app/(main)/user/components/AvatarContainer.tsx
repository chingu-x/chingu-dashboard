"use client";

import { getUser, serverSignIn } from "@/app/(main)/user/actions";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Bell from "@/components/navbar/Bell";
import DropDown from "@/components/navbar/DropDown";
import { clientSignIn } from "@/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserState } from "@/store/features/user/userSlice";

const name = "Yorick";
const notificationCount = 4;

export default function AvatarContainer() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  async function handleClick() {
    await serverSignIn();
    const user = await getUser();
    dispatch(clientSignIn());
    dispatch(getUserState(user));
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <Bell notificationCount={notificationCount} />
          <div className="flex flex-row items-center px-2 ml-6">
            <Avatar image="/img/avatar.png" height={34} width={34} />
            <DropDown name={name} />
          </div>
        </>
      ) : (
        <Button
          title="Login"
          type="button"
          customClassName="btn-primary text-base-300 capitalize"
          onClick={handleClick}
        >
          Log In
        </Button>
      )}
    </>
  );
}
