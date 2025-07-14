'use client';

import { useState, FormEvent } from 'react';

type Mensaje = { de: 'usuario' | 'bot'; texto: string };

export default function Page() {
  const [chat, setChat] = useState<Mensaje[]>([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);

  const enviar = async (e: FormEvent) => {
    e.preventDefault(); if (!msg) return;
    setLoading(true);
    const res   = await fetch(`/api/agent?idagente=anon&msg=${encodeURIComponent(msg)}`);
    const texto = await res.text();
    setChat(c => [...c, { de: 'usuario', texto: msg }, { de: 'bot', texto }]);
    setMsg(''); setLoading(false);
  };

  return (
    <div className={`w-full flex items-center justify-center min-h-screen transition-colors duration-300 ${dark ? 'dark' : ''}`}>
      <div className="w-full max-w-xl flex flex-col shadow-xl rounded-2xl p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800" style={{minHeight: '500px'}}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Chat IA</h1>
          <button
            onClick={() => setDark(d => !d)}
            className="rounded-full p-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Cambiar tema"
          >
            {dark ? '🌙' : '☀️'}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent" style={{minHeight: '300px', maxHeight: '350px'}}>
          {chat.length === 0 && (
            <div className="text-center text-gray-400 py-12">¡Comienza la conversación!</div>
          )}
          {chat.map((m, i) => (
            <div key={i}
              className={
                `p-3 rounded-xl max-w-[70%] break-words shadow-md ${m.de === 'usuario'
                  ? 'ml-auto bg-blue-600 text-white'
                  : 'mr-auto bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`
              }
            >
              {m.texto}
            </div>
          ))}
        </div>
        <form onSubmit={enviar} className="mt-4 flex gap-2">
          <input
            className="flex-1 rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 text-base"
            placeholder="Escribe tu mensaje…"
            value={msg}
            onChange={e => setMsg(e.target.value)}
            disabled={loading}
            required
            autoFocus
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl disabled:opacity-50 transition text-base font-semibold"
          >
            {loading ? '…' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
}