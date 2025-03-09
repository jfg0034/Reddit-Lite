import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedByType } from '../../api/apiService';

// Load feed
export const loadFeed = createAsyncThunk(
    'feed/getFeed',
    async({subreddit, sort}) => {
        return await getFeedByType(subreddit, sort);
    }
);

const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        subreddit: 'popular',
        feed: [],
        isLoading: false,
        hasError: false
    },
    reducers: {
        setCurrentSubreddit: (state, action) => {
            state.subreddit = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFeed.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadFeed.fulfilled, (state, action) => {
                state.feed = action.payload;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadFeed.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    }
});

export const { setCurrentSubreddit } = feedSlice.actions;
export default feedSlice.reducer;