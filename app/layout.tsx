import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "National Parks Tracker",
  description: "Track the national parks you have visited.",
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
              <div className="flex items-center">
                <Image
                  src="/logos/US-NationalParkService-Logo.svg"
                  alt="National Park Service Logo"
                  width={100}
                  height={100}
                />
                <a href="/" className="text-white text-2xl font-semibold">
                  National Parks
                </a>
              </div>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="/"
                    className="text-white hover:text-green-600 text-bold"
                  >
                    Explore Parks
                  </a>
                </li>
                <li>
                  <a
                    href="/visited-parks"
                    className="text-white hover:text-green-600 text-bold"
                  >
                    Visited Parks
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main className="container mx-auto p-4">{children}</main>

          <footer className="bg-wood-trees text-white text-center p-4">
            &copy; {new Date().getFullYear()} National Parks Tracker
          </footer>
        </div>
      </body>
    </html>
  );
}
