import { configureStore } from '@reduxjs/toolkit'
import { userAPI } from './api/userApi'
import { userReducer } from './reducer/userReducer'
import { productAPI } from './api/productApi'
import { cartReducer } from './reducer/cartReducer';

export const server = import.meta.env.VITE_SERVER;
export const store = configureStore({
  reducer: { 
    [userReducer.name]:userReducer.reducer,
    [userAPI.reducerPath]:userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware({ 
    serializableCheck:false,
  }).concat(userAPI.middleware, productAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>
