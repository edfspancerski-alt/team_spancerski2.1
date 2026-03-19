'use client';

import { useState } from 'react';
import { Card, CardContent } from './card';
import { Button } from './button';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
}

export const CommunityChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', user: 'Coach Carlos', text: 'Bom dia time! Preparados para o treino de hoje?', timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now().toString(), user: 'Você', text: input, timestamp: new Date() };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <Card className="h-[500px] flex flex-col">
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.user === 'Você' ? 'items-end' : 'items-start'}`}>
            <span className="text-xs text-muted-foreground mb-1">{m.user}</span>
            <div className={`px-3 py-2 rounded-lg text-sm ${m.user === 'Você' ? 'bg-primary text-white' : 'bg-muted'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </CardContent>
      <div className="p-4 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage}>Enviar</Button>
      </div>
    </Card>
  );
};
