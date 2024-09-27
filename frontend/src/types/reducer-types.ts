import { User } from "./types";

export interface UserReducerInitialState{ 
    user: User | null; 
    isLoading: boolean; 
    token: string | null;
}