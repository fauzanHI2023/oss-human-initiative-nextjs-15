import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import AuthProvider from "@/context/SessionProvider";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/sections/Navbar";
import Footer from "@/components/ui/footer/Footer";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Human Initiative",
  description: "Human Initiative Fundraising",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
            <CartProvider>
              <Navbar/>
              {children}
              <Footer/>
            </CartProvider>
          </AuthProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
