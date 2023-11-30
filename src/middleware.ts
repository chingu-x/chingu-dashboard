import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies;

  console.log(cookie);
}
