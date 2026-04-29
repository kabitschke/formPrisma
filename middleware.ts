import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = "segredo_super_secreto";

export function middleware(req: any) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    try {
        jwt.verify(token, JWT_SECRET);
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/", req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};