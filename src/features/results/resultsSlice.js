import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSearchResults } from '../../api/apiService';

// Load results
const loadResults = createAsyncThunk(
    'results/getResults',
    async(query) => {
        return await getSearchResults(query);
    }
);

const resultsSlice = createSlice({
    name: 'results',
    initialState: {
        results: [],
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadResults.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadResults.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.results = action.payload;
            })
            .addCase(loadResults.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    }
});

export default resultsSlice.reducer;