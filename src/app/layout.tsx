import './globals.css';
import type { ReactNode } from 'react';

export const metadata = { title: 'Agente IA' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <main className="w-full min-h-screen flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}