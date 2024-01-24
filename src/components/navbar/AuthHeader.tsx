"use client";
import { getUser, serverSignIn } from "@/app/(auth)/authService";
import { clientSignIn } from "@/store/features/auth/authSlice";
import { getUserState } from "@/store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Bell from "@/components/navbar/Bell";
import DropDown from "@/components/navbar/DropDown";


const notificationCount = 4;

export default function AuthHeader() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { firstName } = useAppSelector((state) =>state.user)

  async function handleClick() {
    await serverSignIn();
    const user = await getUser();
    if (user) {
      dispatch(clientSignIn());
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
            <DropDown name={firstName} openState={false}/>
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
