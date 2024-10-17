import { configureStore } from '@reduxjs/toolkit'
import { authAPI } from './api/authApi'
import { userReducer } from './reducer/userReducer'
import { productAPI } from './api/productApi'
import { cartReducer } from './reducer/cartReducer';
import { orderAPI } from './api/orderApi';
import { userAPI } from './api/userApi';

export const server = import.meta.env.VITE_SERVER;
export const store = configureStore({
  reducer: { 
    [userReducer.name]:userReducer.reducer,
    [authAPI.reducerPath]:authAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [cartReducer.name]: cartReducer.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware({ 
    serializableCheck:false,
  }).concat(authAPI.middleware, productAPI.middleware, orderAPI.middleware,userAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>
