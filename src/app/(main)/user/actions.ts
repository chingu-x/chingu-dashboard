"use server";

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
        cache: "no-store",
      }
    );

    console.log(await res.json());
  } catch (error) {}
}
