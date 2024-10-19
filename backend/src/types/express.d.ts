//src/types/express.d.ts
import { Server as SocketIOServer } from 'socket.io';

declare global {
  namespace Express {
    interface Request {
      user?: any;
      io: SocketIOServer;
    }
  }
}

// declare module 'express-serve-static-core' {
//   interface Request {
//     io: SocketIOServer;
//   }
// }

export {};
