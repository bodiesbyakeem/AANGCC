import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protect /portal — redirect to login if not authenticated
  if (request.nextUrl.pathname.startsWith("/portal") && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/membership/members-only";
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in and visiting login page, redirect to portal
  if (request.nextUrl.pathname === "/membership/members-only" && user) {
    const portalUrl = request.nextUrl.clone();
    portalUrl.pathname = "/portal";
    return NextResponse.redirect(portalUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/portal/:path*", "/membership/members-only"],
};

