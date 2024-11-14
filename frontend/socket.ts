import { io, Socket } from 'socket.io-client';
const ORIGIN = 'http://localhost:3000';

interface ServerToClientEvents {
  message: (item: string) => void;
}

interface ClientToServerEvents {
  message: (item: string) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(ORIGIN);

export default socket;
