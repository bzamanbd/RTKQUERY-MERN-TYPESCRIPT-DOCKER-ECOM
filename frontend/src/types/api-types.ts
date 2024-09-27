import { User } from "./types";

export type MessageResponse = { 
    message: string;
    data: {
        user: User; 
        token: string;
    };
}
