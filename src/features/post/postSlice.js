import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPostPage } from "../../api/apiService";

// Load page with post and comments
export const loadPostPage = createAsyncThunk(
    'post/loadPage', 
    async({subreddit, postId}) => {
        return await getPostPage(subreddit, postId);
    }
);

const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: {},
        comments: [],
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPostPage.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadPostPage.fulfilled, (state, action) => {
                state.post = action.payload.post;
                state.comments = action.payload.comments;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadPostPage.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    }
});

export default postSlice.reducer;