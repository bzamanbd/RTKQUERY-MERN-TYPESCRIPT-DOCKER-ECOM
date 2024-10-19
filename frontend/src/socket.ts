// src/socket.ts
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8000'; // Replace with your backend URL

let socket: Socket | null = null;

export const connectSocket = () => {
  socket = io(SOCKET_URL, {
    withCredentials: true,
  });

  socket.on('connect', () => {
    console.log('Connected to socket server:', socket?.id);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });
};

export const getSocket = () => {
  if (!socket) {
    connectSocket();
  }
  return socket;
};
