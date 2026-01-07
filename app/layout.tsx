import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import QueryProvider from "@/providers/QueryProvider";
import SessionProvider from "@/providers/SessionProvider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-gray-100">
        <SessionProvider>
          <QueryProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
