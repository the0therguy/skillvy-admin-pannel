import localFont from "next/font/local";
import "./globals.css";
import {AuthProvider} from "@/app/Context/AuthContext";
import { Toaster } from "@/components/ui/toaster"
import NavBar from "@/app/Components/NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <AuthProvider>
        <NavBar />
        {children}
        <Toaster />
      </AuthProvider>
      </body>
    </html>
  );
}
