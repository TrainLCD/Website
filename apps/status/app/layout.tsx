import type { Metadata } from 'next';
import './styles/global.css';
import { detectLocale } from './server/lib/locale';

export const metadata: Metadata = {
  title: 'TrainLCD System Status',
  description: 'TrainLCDサービスの障害情報をお知らせします。',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'TrainLCD System Status',
    description: 'TrainLCDサービスの障害情報をお知らせします。',
    type: 'website',
    url: 'https://status.trainlcd.app',
    images: '/opengraph-image.20251201.png',
  },
  twitter: {
    card: 'summary',
    title: 'TrainLCD System Status',
    description: 'TrainLCDサービスの障害情報をお知らせします。',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await detectLocale();
  
  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white min-h-screen flex flex-col items-center text-neutral-800">
        {children}
      </body>
    </html>
  );
}
