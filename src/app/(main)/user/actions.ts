export async function serverSignIn() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "jessica.williamson@gmail.com",
          password: "password",
        }),
        credentials: "include",
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function serverSignOut() {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return await data.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getUser() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`,
      {
        credentials: "include",
      }
    );

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
