import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
console.log('sockets doing its thing to set up socket.js client-side, helpful, yes!')

export const socket = io(URL);