/// <reference types="vite/client" />

export type User = {
    name?: string;
    email?: string;
    password?: string,
    phone?: string;
    address?: string;
    avatar?: string;
    question?: string;
    role?: string;
    isBanned?: boolean;
    orders?: []
}

