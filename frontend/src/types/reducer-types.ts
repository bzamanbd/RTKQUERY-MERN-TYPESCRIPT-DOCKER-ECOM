import { User } from "../vite-env";

export interface UserReducerInitialState{ 
    user: User | null; 
    isLoading: boolean; 
    token: string | null;
}