import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const fateCategory = createAsyncThunk('fetchCategory', async()=>{
    const data = await fetch("https://jsonplaceholder.typicode.com/posts")
    return data.json()
})

const category = createSlice({
    name: "category",
    initialState:{
        isLoading: false,
        data:null,
        error:false
    },
    extraReducers:(builder)=>{
        builder.addCase(fateCategory.pending, (state, action)=>{
            state.isLoading = true;
        });
        builder.addCase(fateCategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        builder.addCase(fateCategory.rejected, (state,action)=>{
            state.error = true;
        })
    }
})


export default category.reducer;