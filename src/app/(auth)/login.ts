import axios from "axios";

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    // eslint-disable-next-line no-console
    console.log(response);
    //   return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
