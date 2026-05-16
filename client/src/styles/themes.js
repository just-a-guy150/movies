import { createTheme } from "@mui/material";

let darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#323750',
        },
        secondary: {
            main: '#7d4f5b',
        },
        error: {
            main: '#d2281b',
        },
        background: {
            paper: '#606060',
            default: '#303030',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255,255,255,0.7)',
            disabled: 'rgba(255,255,255,0.5)',
            hint: 'rgba(255,255,255,0.5)',
        }
    },
    typography: {
        fontFamily: 'Comfortaa, sans-serif'
    }
})

let lightTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#909dd8',
        },
        secondary: {
            main: '#d2386c',
        },
        background: {
            paper: '#ffffff',
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: 'Comfortaa, sans-serif',
    }
})

export { darkTheme, lightTheme }