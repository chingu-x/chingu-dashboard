"use client";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Bell from "@/components/navbar/Bell";
import DropDown from "@/components/navbar/DropDown";
import { clientSignIn } from "@/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserState } from "@/store/features/user/userSlice";
import { getUser, serverSignIn } from "@/api/authService";

const name = "Yorick";
const notificationCount = 4;

export default function AuthHeader() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  async function handleClick() {
    await serverSignIn();
    const user = await getUser();
    console.log(user);
    dispatch(clientSignIn());

    if (user) {
      dispatch(getUserState(user));
    }
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
        <Button title="Login" type="button" onClick={handleClick}>
          Log In
        </Button>
      )}
    </>
  );
}
