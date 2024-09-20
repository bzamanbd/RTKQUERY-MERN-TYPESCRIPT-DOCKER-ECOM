import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
         id?: string | JwtPayload, 
         role?:"client" | "admin" | "vendor" | "driver",
        }; // Extend with user property
    }
  }
}
