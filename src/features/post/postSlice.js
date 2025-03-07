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
        post: null,
        comments: [],
        isLoading: false,
        hasError: false
    },
    reducers: {
        setCurrentPost: (state, action) => {
            state.post = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPostPage.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadPostPage.fulfilled, (state, action) => {
                state.comments = action.payload.comments;
                if (!state.post) { // Update post only if it is not present already
                    state.post = action.payload.post;
                }
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadPostPage.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    }
});

export const { setCurrentPost } = postSlice.actions;

export default postSlice.reducer;