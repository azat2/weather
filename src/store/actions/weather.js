import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const counterSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        saveWeather: (state, action) => {
            return action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { saveWeather } = counterSlice.actions

export default counterSlice.reducer