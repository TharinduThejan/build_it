import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import QueryProvider from "@/providers/QueryProvider";
import SessionProvider from "@/providers/SessionProvider";
import Providers from "./providers";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-gray-100" suppressHydrationWarning={true}>
        <Providers>
          <SessionProvider>
            <QueryProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </QueryProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}


