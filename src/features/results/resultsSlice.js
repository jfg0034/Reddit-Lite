import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSearchResults } from '../../api/apiService';

// Load results
export const loadResults = createAsyncThunk(
    'results/getResults',
    async({query, sort}) => {
        return await getSearchResults(query, sort);
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
                state.results = action.payload;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadResults.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    }
});

export default resultsSlice.reducer;