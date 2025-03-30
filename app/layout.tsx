import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Provider } from '@/components/ui/provider';
import { ViewTransitions } from 'next-view-transitions';
import { Toaster } from '@/components/ui/toaster';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const publicSans = localFont({
  src: './fonts/PublicSans-Bold.ttf',
  variable: '--font-public-sans',
  weight: '100 900',
});
export const metadata: Metadata = {
  title: '247workspace',
  description: 'Project and task management for your team',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${publicSans} antialiased`}
        >
          <Provider>
            {children}
            <Toaster />
          </Provider>
        </body>
      </html>
    </ViewTransitions>
  );
}
