import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Сайт",
  description: "Сайт",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={styles.page}>
        <Header />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
