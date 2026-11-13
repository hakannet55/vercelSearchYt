import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vercel Search YT',
  description: 'YouTube niche research and viral opportunity intelligence.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
