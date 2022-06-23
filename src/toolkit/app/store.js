import { configureStore } from '@reduxjs/toolkit'
import foodReducer from '../slice/foodSlice'

const store = configureStore({
    reducer: {
        food: foodReducer
    }
})

export default store