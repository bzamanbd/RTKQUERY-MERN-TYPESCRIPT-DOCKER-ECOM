import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { User } from "../../../vite-env";

interface BackendResponse{ 
    user: User;
    token: string;
}

const initialState: UserReducerInitialState = { 
    user: null,
    isLoading: true,
    token: null
}

export const userReducer = createSlice({ 
    name: 'userReducer',
    initialState, 
    reducers: { 
        userExist: (state, action: PayloadAction<BackendResponse>)=>{
            state.isLoading=false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            // console.log('state.user', state.user);
        },
        userNotExist: (state)=>{
            state.isLoading=false;
            state.user = null;
            state.token = null;
        },
    },
});

export const {userExist, userNotExist} = userReducer.actions;