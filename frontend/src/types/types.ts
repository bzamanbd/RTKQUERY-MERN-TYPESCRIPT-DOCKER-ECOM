export type User = { 
    name?: string; 
    email: string;
    password: string;
    phone?: string | null;
    avatar?: string | null; 
    role?: string; 
    token: string; 
    isBanned: boolean;
}