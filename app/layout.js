import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "TeleWrapped",
  description: "Your Telegram in review",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body
        className={`${openSans.variable} antialiased bg-[#efe7dc]`}
      >
        {children}
      </body>
    </html>
  );
}
