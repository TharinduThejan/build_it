import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "admin";
      }
      if (req.nextUrl.pathname.startsWith("/cart")) {
        return token?.role === "user" || token?.role === "admin";
      }
      return true;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*", "/cart/:path*"],
};
