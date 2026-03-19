'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ChatContextProps {
  socket: WebSocket | null;
  sendMessage: (msg: any) => void;
}

const ChatContext = createContext<ChatContextProps>({ socket: null, sendMessage: () => {} });

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Mocking WebSocket connection for demo
    // In production, this would be: const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);
    console.log('Connecting to WebSocket...');

    return () => {
      socket?.close();
    };
  }, []);

  const sendMessage = (msg: any) => {
    console.log('Sending message via WS:', msg);
    // socket?.send(JSON.stringify(msg));
  };

  return (
    <ChatContext.Provider value={{ socket, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
