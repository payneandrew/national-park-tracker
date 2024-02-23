import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SurveyProvider } from './context/survey-context';
import './globals.css';

export const metadata: Metadata = {
  title: 'National Parks Tracker',
  description: 'Track the national parks you have visited.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col h-full bg-white font-schibsted-font">
          <nav className="bg-coffee-brown p-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logos/US-NationalParkService-Logo.svg"
                  alt="National Park Service Logo"
                  width={60}
                  height={60}
                  priority={true}
                />
                <h1 className="text-white text-3xl font-semibold">
                  National Parks Tracker
                </h1>
              </Link>
              <ul className="flex space-x-4">
                <li>
                  <Link
                    href="/states"
                    className="flex hover:bg-mary-green rounded p-2 m-2 transform transition-transform duration-200 hover:scale-105 text-white shadow-lg items-center justify-center"
                  >
                    Parks by State
                  </Link>
                </li>
                {process.env.NEXT_PUBLIC_VISITED_PARKS_ENABLED === 'true' && (
                  <li>
                    <Link
                      href="/visited-parks"
                      className="flex hover:bg-mary-green rounded p-2 m-2 transform transition-transform duration-200 hover:scale-105 text-white shadow-lg items-center justify-center"
                    >
                      Visited Parks
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
          <main className="flex flex-grow justify-center p-10 flex-col ">
            <SurveyProvider>{children}</SurveyProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
