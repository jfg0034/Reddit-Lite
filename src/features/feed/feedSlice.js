import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHomeFeed } from '../../api/apiService';

// Load feed
export const loadFeed = createAsyncThunk(
    'feed/getFeed',
    async() => {
        console.log('inside thunk...');
        return await getHomeFeed();
    }
);

const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        feed: [],
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadFeed.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadFeed.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.feed = action.payload;
            })
            .addCase(loadFeed.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    }
});


export default feedSlice.reducer;