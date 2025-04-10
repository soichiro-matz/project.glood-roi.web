// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const auth = request.headers.get("authorization");
  if (auth) {
    const [user, pass] = Buffer.from(auth.split(" ")[1], "base64")
      .toString()
      .split(":");
    if (user === "admin" && pass === "secret123") return NextResponse.next();
  }
  return new NextResponse("Auth Required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
