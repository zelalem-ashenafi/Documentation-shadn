'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      if (pathname !== "/login") {
        router.replace("/login"); // replace avoids back flicker
      }
    } else {
      setIsLoggedIn(true);
    }

    setIsReady(true);
  }, [pathname, router]);

  // ⏳ Hold render until we know whether user is logged in
  if (!isReady) {
    return (
      <html lang="en">
        <body className={`${geist.className} ${geistMono.variable}`}>
          <main className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
          </main>
        </body>
      </html>
    );
  }

  const isAuthPage = pathname === "/login";

  // 🔹 If not logged in and trying to access a protected page → don't render children
  if (!isLoggedIn && !isAuthPage) {
    return (
      <html lang="en">
        <body className={`${geist.className} ${geistMono.variable}`}>
          <main className="flex items-center justify-center min-h-screen">
            <p>Redirecting...</p>
          </main>
        </body>
      </html>
    );
  }

  // 🔹 Normal rendering
  return (
    <html lang="en">
      <body className={`${geist.className} ${geistMono.variable} overflow-x-hidden`}>
        {isAuthPage ? (
          <main className="flex items-center justify-center min-h-screen">
            {children}
          </main>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
