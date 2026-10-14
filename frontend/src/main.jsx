// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import "leaflet/dist/leaflet.css";
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { Provider } from "react-redux";
import { store } from './store/store.js'
import { AppProvider } from './contexts/AppContext.jsx'
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
)
