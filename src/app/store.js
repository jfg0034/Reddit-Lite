import { configureStore } from "@reduxjs/toolkit";
import feedReducer from '../features/feed/feedSlice';
import resultsReducer from '../features/results/resultsSlice';
import searcBarReducer from '../features/searchBar/searchBarSlice';
import postReducer from '../features/post/postSlice';
import subredditsReducer from '../features/subreddits/subredditsSlice';

export default configureStore({
    reducer: {
        feed: feedReducer,
        results: resultsReducer,
        searchBar: searcBarReducer,
        post: postReducer,
        subreddits: subredditsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(({ dispatch, getState }) => (next) => (action) => {
            console.log("Dispatching action:", action);
            return next(action);
        }),
});