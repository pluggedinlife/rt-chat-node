import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import dotenv from 'dotenv';
import routes from './routes/routes';
import cors from 'cors';
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from './interfaces/socket.interfaces';

dotenv.config();

const PORT = process.env.PORT;
const ORIGIN = process.env.FE_ORIGIN;
const generalRouting = '';

const app = express();
app.use(express.json());
app.use(cors());
app.use(generalRouting, routes);
app.use('*', routes);

const server = createServer(app);

const io = new Server<ServerToClientEvents, ClientToServerEvents>(server, {
  cors: {
    origin: ORIGIN,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
});

io.on(
  'connection',
  (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    console.log('a user connected: ', socket.id);

    socket.on('message', (item: string, id: string) => {
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
