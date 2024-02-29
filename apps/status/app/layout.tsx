import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

const inter = Roboto({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://status.trainlcd.app"),
  title: "TrainLCD System Status",
  description: "TrainLCDサービスの障害情報",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
