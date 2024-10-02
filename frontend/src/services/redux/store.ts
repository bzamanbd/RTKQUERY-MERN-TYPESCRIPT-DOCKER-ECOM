import { configureStore } from '@reduxjs/toolkit'
import { userAPI } from './api/userApi'
import { userReducer } from './reducer/userReducer'
import { productAPI } from './api/productApi'

export const store = configureStore({
  reducer: { 
    [userAPI.reducerPath]:userAPI.reducer,
    [userReducer.name]:userReducer.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
  },
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware({ 
    serializableCheck:false,
  }).concat(userAPI.middleware, productAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>
