import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  console.log("Middleware is running: ", request.url);

  response.cookies.set("statusCookie", "cookie", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 10 * 60,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
