export async function middleware() {
  // if (request.cookies.has("refresh_token")) {
  //   if (request.cookies.has("access_token")) {
  //     return NextResponse.next();
  //   }
  //   const token = getRefreshToken()!;
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Cookie: token,
  //       },
  //       credentials: "include",
  //       cache: "no-store",
  //     },
  //   );
  //   if (!res.ok) {
  //     throw new Error(`Status code: ${res.status}, Message: ${res.statusText}`);
  //   }
  //   const accessToken = res.headers.getSetCookie()[0].split("access_token=")[1];
  //   const refreshToken = res.headers
  //     .getSetCookie()[0]
  //     .split(";")
  //     .slice(5)
  //     .join("")
  //     .split(",")
  //     .slice(1)
  //     .join("");
  //   const accessTokenValue = accessToken.split("; ")[0];
  //   const accessTokenMaxAge = accessToken.split("; ")[1].split("=")[1];
  //   const refreshTokenValue = refreshToken.match(/refresh_token=([^ ]+)/)![1];
  //   const refreshTokenMaxAge = refreshToken.match(/Max-Age=(\d+)/)![1];
  //   const response = NextResponse.next();
  //   response.cookies.set({
  //     name: "access_token",
  //     value: accessTokenValue,
  //     httpOnly: true,
  //     maxAge: +accessTokenMaxAge,
  //     path: "/",
  //     secure: true,
  //   });
  //   response.cookies.set({
  //     name: "refresh_token",
  //     value: refreshTokenValue,
  //     httpOnly: true,
  //     maxAge: +refreshTokenMaxAge,
  //     path: "/",
  //     secure: true,
  //   });
  //   return response;
  // }
  // return NextResponse.next();
}
