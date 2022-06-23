import * as api from '../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    FoodData: [],
    error: ''
}

export const fetchFoods = createAsyncThunk('food/fetchFoods', async () => {
    const { data: { foodData, message } } = await api.getFoods();
    alert(message)
    return foodData;
});

export const deleteaFood = createAsyncThunk('food/deleteFood', async (id) => {
    await api.deleteaFood(id);
    return id;
}
);

export const createaFood = createAsyncThunk('food/createaFood', async (formData) => {
    const { data: { foodCreatedData, message } } = await api.createaFood(formData);
    alert(message)
    return { foodCreatedData };
}
);

export const updateaFood = createAsyncThunk('food/updateaFood', async (homeUpdate) => {
    const { currentId: id, formData } = homeUpdate;
    const { data: { foodUpdatedData, message } } = await api.updateaFood(id, formData);
    alert(message);
    return foodUpdatedData;
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
            state.FoodData = action.payload
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
            state.FoodData = []
            state.error = action.error.message
        }
        )
        // update req start
        builder.addCase(updateaFood.pending, state => {
            state.loading = true
        }
        )
        builder.addCase(updateaFood.fulfilled, (state, action) => {
            state.loading = false
            state.FoodData = state.FoodData.map(foodData => {
                if (foodData._id === action.payload._id) {
                    return action.payload
                }
                return foodData
            }
            )
            state.error = ''
        }
        )
        builder.addCase(updateaFood.rejected, (state, action) => {
            state.loading = false
            state.FoodData = []
            state.error = action.error.message
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