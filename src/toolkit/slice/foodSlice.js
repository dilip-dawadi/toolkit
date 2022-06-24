import * as api from '../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { NotifyError, NotifyInfo, NotifySuccess, NotifyWarning } from './Notification';

const initialState = {
    loading: false,
    FoodData: [],
    error: ''
}

export const fetchFoods = createAsyncThunk('food/fetchFoods', async () => {
    const { data: { foodData, message } } = await api.getFoods();
    NotifyInfo(message)
    return { foodData, message };
});

export const deleteaFood = createAsyncThunk('food/deleteFood', async (id) => {
    const { data: { message } } = await api.deleteaFood(id);
    NotifySuccess(message);
    return id;
}
);

export const createaFood = createAsyncThunk('food/createaFood', async (formData, { rejectWithValue }) => {
    try {
        const { data: { foodCreatedData, message } } = await api.createaFood(formData);
        NotifySuccess(message);
        return { foodCreatedData };
    } catch (error) {
        if (error.response.status >= 400 && error.response.status <= 500) {
            NotifyWarning(error.response.data.message)
            return rejectWithValue(error.response.data.message);
        } else {
            NotifyError(error.message)
            return rejectWithValue(error.message)
        }
    }
}
);
// fulfillWithValue 
export const updateaFood = createAsyncThunk('food/updateaFood', async (homeUpdate, { rejectWithValue }) => {
    try {
        const { currentId: id, formData } = homeUpdate;
        const { data: { foodUpdatedData, message } } = await api.updateaFood(id, formData);
        NotifySuccess(message);
        return { foodUpdatedData };
    } catch (error) {
        if (error.response.status >= 400 && error.response.status <= 500) {
            NotifyWarning(error.response.data.message)
            return rejectWithValue(error.response.data.message);
        } else {
            NotifyError(error.message)
            return rejectWithValue(error.message)
        }
    }
}
);

const FoodSlice = createSlice({
    name: 'food',
    initialState,
    extraReducers: builder => {
        // get req start
        builder.addCase(fetchFoods.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchFoods.fulfilled, (state, action) => {
            state.loading = false
            state.FoodData = action.payload.foodData
            state.error = ''
        })
        builder.addCase(fetchFoods.rejected, (state, action) => {
            state.loading = false
            state.FoodData = []
            state.error = action.error.message
        })
        // create req start
        builder.addCase(createaFood.pending, state => {
            state.loading = true
        }
        )
        builder.addCase(createaFood.fulfilled, (state, action) => {
            state.loading = false
            state.FoodData = [...state.FoodData, action.payload.foodCreatedData]
            state.error = ''
        }
        )
        builder.addCase(createaFood.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        }
        )
        // update req start
        builder.addCase(updateaFood.pending, state => {
            state.loading = true
        }
        )
        builder.addCase(updateaFood.fulfilled, (state, action) => {
            state.loading = false
            state.FoodData = state?.FoodData?.map(foodData => {
                if (foodData._id === action.payload.foodUpdatedData._id) {
                    return action.payload.foodUpdatedData
                }
                return foodData
            }
            )
            state.error = ''
        }
        )
        builder.addCase(updateaFood.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        }
        )
        // delete req start
        builder.addCase(deleteaFood.pending, state => {
            state.loading = true
        })
        builder.addCase(deleteaFood.fulfilled, (state, action) => {
            state.loading = false
            state.FoodData = state.FoodData?.filter((foodPage) => foodPage._id !== action.payload)
            state.error = ''
        })
        builder.addCase(deleteaFood.rejected, (state, action) => {
            state.loading = false
            state.FoodData = []
            state.error = action.error.message
        })
    }
})

export default FoodSlice.reducer