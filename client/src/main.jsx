import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Provider, useSelector, useDispatch } from 'react-redux'
import store from './store/store.js'
import { ThemeProvider } from '@emotion/react'
import { darkTheme, lightTheme } from './styles/themes.js'
import { useEffect } from 'react'
import { loadThemeFromLocalStorage } from './store/generalReducer.js'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <Wrapper />
        </Provider>
    </BrowserRouter>
)

function Wrapper() {
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadThemeFromLocalStorage())

    }, [])

    let theme = useSelector((state) => state.general.theme)
    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <App />
        </ThemeProvider>
    )
}