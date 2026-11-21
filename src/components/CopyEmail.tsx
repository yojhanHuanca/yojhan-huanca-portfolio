'use client';

import { useState } from 'react';

export default function CopyEmail({ email }: { email: string }) {
  const [message, setMessage] = useState('');
  return <div className="copy-email">
    <button className="button button-ghost" type="button" onClick={async () => {
      try {
        await navigator.clipboard.writeText(email);
        setMessage('Correo copiado.');
      } catch {
        setMessage('Selecciona la dirección de correo para copiarla.');
      }
    }}>Copiar correo</button>
    <p role="status">{message}</p>
  </div>;
}
