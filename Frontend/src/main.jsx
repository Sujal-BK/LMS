import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import {Toaster}  from 'react-hot-toast'
import {store} from './Store/store.jsx'
import {Provider} from 'react-redux'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
  <StrictMode>
    <App />

    <Toaster/>
  </StrictMode>
  </Provider>
  </BrowserRouter>,
)
