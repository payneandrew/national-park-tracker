import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <div className="bg-nature-bg text-nature-text font-sans min-h-screen">
      <nav className="bg-wood-trees p-4">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="text-white text-2xl font-semibold">
            National Parks
          </a>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-white hover:text-green-200">
                Explore Parks
              </a>
            </li>
            <li>
              <a href="/visited" className="text-white hover:text-green-200">
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
  );
}
