import './globals.css';
import type { ReactNode } from 'react';

export const metadata = { title: 'Agente IA' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50">
        <main className="w-full min-h-screen bg-gray-100 p-6 flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}