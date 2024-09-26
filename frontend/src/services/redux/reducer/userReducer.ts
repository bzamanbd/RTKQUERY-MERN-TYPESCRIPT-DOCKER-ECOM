import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { User } from "../../../types/types";

interface BackendResponse{ 
    user: User;
    token: string;
}

const initialState: UserReducerInitialState = { 
    user: null,
    loading: true,
    token: null
}

export const userReducer = createSlice({ 
    name: 'userReducer',
    initialState, 
    reducers: { 
        userExist: (state, action: PayloadAction<BackendResponse>)=>{
            state.loading=false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        userNotExist: (state)=>{
            state.loading=false;
            state.user = null;
            state.token = null;
        },
    },
});

export const {userExist, userNotExist} = userReducer.actions;