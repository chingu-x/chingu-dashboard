import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getRefreshToken } from "./utils/getCookie";

export async function middleware(request: NextRequest) {
  console.log(request.cookies.getAll());
  if (request.cookies.has("refresh_token")) {
    if (request.cookies.has("access_token")) {
      return NextResponse.next();
    }
    const token = getRefreshToken()!;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
      {
        method: "POST",
        headers: {
          Cookie: token,
        },
      },
    );

    console.log(res.headers.getSetCookie());

    // if (!res.ok) {
    //   throw new Error(`Status code: ${res.status}, Message: ${res.statusText}`);
    // }

    // const accessToken = res.headers.getSetCookie()[0].split("access_token=")[1];
    // const accessTokenValue = accessToken.split("; ")[0];
    // const accessTokenMaxAge = accessToken.split("; ")[1].split("=")[1];
    // const response = NextResponse.next();
    // response.cookies.set({
    //   name: "access_token",
    //   value: accessTokenValue,
    //   httpOnly: true,
    //   maxAge: +accessTokenMaxAge,
    //   path: "/",
    //   secure: true,
    // });
    // return response;
  }
  return NextResponse.next();
}
