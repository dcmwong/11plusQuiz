import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/lib/auth/AuthContext'
import { AuthGate } from '@/components/auth/AuthGate'

export const metadata: Metadata = {
  title: 'Quiz Whiz - 11+ Practice',
  description: 'Master your 11+ exams with interactive quizzes and personalized feedback',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <AuthGate>
            {children}
          </AuthGate>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
