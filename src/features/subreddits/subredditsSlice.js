import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTopSubreddits } from "../../api/apiService";

// Load subreddits
export const loadSubreddits = createAsyncThunk(
    'subreddits/loadSubreddits',
    async () => {
        return await getTopSubreddits();
    }
);

const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits: [],
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSubreddits.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadSubreddits.fulfilled, (state, action) => {
                state.subreddits = action.payload;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadSubreddits.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    }
});

export default subredditsSlice.reducer;