import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = ["/", "/(api|trpc)(.*)"];
const ignoredRoutes = [""];

export default clerkMiddleware((auth, req, evt) => {
  const isPublicRoute = createRouteMatcher(publicRoutes)(req);
  const isIgnoredRoute = createRouteMatcher(ignoredRoutes)(req);

  if (isPublicRoute || isIgnoredRoute) {
    return;
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
