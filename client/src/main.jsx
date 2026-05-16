import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import store from './store/store.js'

import { ThemeProvider } from '@emotion/react'
import { darkTheme, lightTheme } from './styles/themes.js'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <Wrapper/>
        </Provider>
    </BrowserRouter>
)

function Wrapper() {
    return (
        <ThemeProvider theme={lightTheme}>
            <App />
        </ThemeProvider>
    )
}