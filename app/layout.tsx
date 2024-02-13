import type { Metadata } from 'next';
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
    <div className="flex flex-col h-full bg-white font-schibsted-font">
      <main className="flex flex-grow justify-center p-10">
        <SurveyProvider>{children}</SurveyProvider>
      </main>

      <footer className="bg-coffee-brown text-white text-center p-4 flex justify-between">
        <p>{new Date().getFullYear()} National Parks Tracker by Andrew Payne</p>
        <p>
          Made possible by the{' '}
          <Link
            href="https://www.nps.gov/subjects/developer/api-documentation.htm"
            className="underline"
          >
            National Parks API
          </Link>
        </p>
      </footer>
    </div>
  );
}
