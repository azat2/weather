import { configureStore } from '@reduxjs/toolkit'

import weatherReducer from './actions/weather'
import weatherHistoryReducer from './actions/weatherHistory'

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        history: weatherHistoryReducer
    },
})