import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./i18n.config";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ru|kk|en)/:path*"],
};
