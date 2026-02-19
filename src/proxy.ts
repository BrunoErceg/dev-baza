import { NextResponse } from "next/server";

import { auth } from "@/auth";

export const proxy = auth((req: any) => {
  const session = req.auth;
  const isLoggedIn = !!session;
  const username = session?.user?.username;

  const { nextUrl } = req;

  if (!isLoggedIn && nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/prijava", nextUrl));
  }

  if (isLoggedIn && nextUrl.pathname.startsWith("/prijava")) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  if (isLoggedIn && !username && nextUrl.pathname !== "/pocetak") {
    return NextResponse.redirect(new URL("/pocetak", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:html|config|js|css|os|arm|msi|pkg|exe|dmg|iso|7z|rar|zip|tar|gz|apk|deb|rpm|pdf|docx|xlsx|pptx|txt|rtf|mp3|wav|ogg|mp4|webm|ogv|avi|mov|flv|wmv|mpg|mpeg|m4v|3gp|3g2|png|jpg|jpeg|gif|svg|ico|webp|bmp|tiff|woff|woff2|ttf|eot|otf)).*)",
  ],
};
