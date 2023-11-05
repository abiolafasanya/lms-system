import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KodeInspired',
  description: 'Learning Management System suitable for almost everything',
  keywords:
    'learning, learning management system, software development, education, technologiy, software, training, students, tutors, digital learning, digital education',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressContentEditableWarning>
        <body className={cn(plusJakartaSans.className, 'overflow-hidden')}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="lms-theme">
            {props.children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
