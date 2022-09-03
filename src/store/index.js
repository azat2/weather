import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './actions/weather'

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
})