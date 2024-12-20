import {NextUIProvider} from '@nextui-org/react'
import './index.css'; 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './services/redux/store.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> 
    <NextUIProvider>
      
        <App />
     
      </NextUIProvider>
    </Provider>
  </StrictMode>
)
