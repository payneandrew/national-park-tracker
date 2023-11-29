import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
        <div className="bg-nature-bg text-nature-text font-sans min-h-screen">
          <nav className="bg-wood-trees p-4">
            <div className="container mx-auto flex items-center justify-between">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logos/US-NationalParkService-Logo.svg"
                  alt="National Park Service Logo"
                  width={100}
                  height={100}
                  priority={true}
                />
                <h1 className="text-white text-3xl font-semibold">
                  National Parks
                </h1>
              </Link>
              <ul className="flex space-x-4">
                <li>
                  <Link
                    href="/"
                    className="hover:bg-national-park-green rounded p-2 m-2 transform transition-transform duration-200 hover:scale-105 text-white shadow-lg"
                  >
                    Explore Parks
                  </Link>
                </li>
                <li>
                  <Link
                    href="/visited-parks"
                    className="hover:bg-national-park-green rounded p-2 m-2 transform transition-transform duration-200 hover:scale-105 text-white shadow-lg"
                  >
                    Visited Parks
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main className="container mx-auto p-4">{children}</main>

          <footer className="bg-wood-trees text-white text-center p-4">
            {new Date().getFullYear()} National Parks Tracker by Andrew Payne
          </footer>
        </div>
      </body>
    </html>
  );
}
