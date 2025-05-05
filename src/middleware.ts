// Import necessary modules and constants
import { AUTH_TOKEN_KEY } from "@/components/Utils/data";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const verifyCookie = req.cookies.get(AUTH_TOKEN_KEY);
	const hasValidToken = !!verifyCookie;

	// Paths considered as authentication-related (you can adjust if your structure changes)
	const isAuthPage = pathname.startsWith("/auth") || ["/login"].includes(pathname);
	// "/brand", "/create-course", "/organisation",

	// Redirect verified users away from authentication pages
	if (hasValidToken && isAuthPage) {
		req.nextUrl.pathname = "/";
		return NextResponse.redirect(req.nextUrl);
	}

	// Redirect unverified users to the login page if they access non-auth pages
	if (!hasValidToken && !isAuthPage) {
		req.nextUrl.pathname = "/login";
		return NextResponse.redirect(req.nextUrl);
	}

	// Allow access to Next.js static files and continue for other cases
	if (pathname.startsWith("/_next")) return NextResponse.next();

	// Default response if no redirection is triggered
	return NextResponse.next();
}

// Configuration for middleware matcher
export const config = {
	matcher: [
		"/((?!_next|api|public|Images|dev_images).*)",  // Match all paths except `_next`, `api`, and `public` folder routes
	],
};
