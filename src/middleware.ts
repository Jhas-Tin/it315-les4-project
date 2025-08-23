// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Tell Clerk which routes require auth
const isProtectedRoute = createRouteMatcher([
  "/keys(.*)",     // Protect the Keys page
  "/api/keys(.*)", // Protect API routes for keys
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    // Correct: auth is already an object
    auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
