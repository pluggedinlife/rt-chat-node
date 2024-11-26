import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
const PORT = 3000;
const ORIGIN = 'http://localhost:5173';

const app = express();
const server = createServer(app);

interface ServerToClientEvents {
  message: (item: string, id: string) => void;
}

interface ClientToServerEvents {
  message: (item: string, id: string) => void;
}

const io = new Server<ServerToClientEvents, ClientToServerEvents>(server, {
  cors: {
    origin: ORIGIN,
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'connection' });
});

io.on(
  'connection',
  (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    console.log('a user connected: ', socket.id);

    socket.on('message', (item: string, id: string) => {
      console.log('message: ' + item + id);
      io.emit('message', item, socket.id);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  }
);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
