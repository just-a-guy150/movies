import { createSlice } from "@reduxjs/toolkit"

const generalSlice = createSlice({
    name: 'general',
    initialState: {
        theme: 'light'
    },
    reducers: {
        changeTheme: (state, action) => {
            state.theme = action.payload
            localStorage.setItem('theme', action.payload)
        },
        loadThemeFromLocalStorage: (state) => {
            state.theme = localStorage.getItem('theme') || 'light'
        }
    }   
})

export const { changeTheme, loadThemeFromLocalStorage } = generalSlice.actions
export default generalSlice.reducer 