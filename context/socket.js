import React from 'react';
import io from 'socket.io-client';

// export const socket = io('ws://localhost:8000/', {
export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
	methods: ['GET', 'POST'],
	transports: ['websocket'],
	path: '/',
});
export const SocketContext = React.createContext();
