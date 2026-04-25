import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const APIReducer = createSlice({
    name: 'API',
    initialState: {
        movies: [],
        movie: {},
        loading: false,
        errors: null,
        searchMovies: [],
        searchLoading: false
    },
    extraReducers: (builder) => {
        builder.addCase(getMovies.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(getMovies.fulfilled, (state, action) => {
            state.loading = false
            state.movies = action.payload
        })

        builder.addCase(getMovies.rejected, (state, action) => {
            state.loading = false
            state.errors = action.error.message
        })

        builder.addCase(searchMovies.pending, (state, action) => {
            state.searchLoading = true
        })

        builder.addCase(searchMovies.fulfilled, (state, action) => {
            state.searchLoading = false
            state.searchMovies = action.payload
        })

        builder.addCase(searchMovies.rejected, (state, action) => {
            state.searchLoading = false
            state.errors = action.error.message
        })
    }
})

export const getMovies = createAsyncThunk('API/getMovies', async () => {
    let response = await server({
        url: '/movies',
        method: 'GET',
        params: data
    })

    return response.data
})

export const searchMovies = createAsyncThunk('API/searchMovies', async () => {
    let response = await server({
        url: '/search',
        method: 'GET',
        params: data
    })

    return response.data
})

export default APIReducer.reducer