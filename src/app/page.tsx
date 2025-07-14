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
    <div className={
      `min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`
    }>
      <div className="w-full max-w-xl flex flex-col shadow-lg rounded-lg p-6 mt-8 mb-4" style={{background: dark ? '#23272f' : '#fff'}}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Chat IA</h1>
          <button
            onClick={() => setDark(d => !d)}
            className="rounded-full p-2 border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            aria-label="Cambiar tema"
          >
            {dark ? '🌙' : '☀️'}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 pb-4" style={{minHeight: '300px'}}>
          {chat.length === 0 && (
            <div className="text-center text-gray-400">¡Comienza la conversación!</div>
          )}
          {chat.map((m, i) => (
            <div key={i}
              className={
                `p-3 rounded-lg max-w-[70%] break-words shadow ${m.de === 'usuario'
                  ? 'ml-auto bg-blue-500 text-white'
                  : 'mr-auto bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}`
              }
            >
              {m.texto}
            </div>
          ))}
        </div>
        <form onSubmit={enviar} className="mt-2 flex gap-2">
          <input
            className="flex-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700"
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition"
          >
            {loading ? '…' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
}