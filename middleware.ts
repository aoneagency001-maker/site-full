import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./i18n.config";
import { updateSession } from './lib/supabase/middleware'
import { type NextRequest } from 'next/server'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export async function middleware(request: NextRequest) {
  // Handle Supabase auth for /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return await updateSession(request)
  }

  // Handle i18n for all other routes
  return intlMiddleware(request)
}

export const config = {
  // Match all routes except static files and API
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
