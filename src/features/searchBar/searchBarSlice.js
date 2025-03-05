import { createSlice } from "@reduxjs/toolkit";

const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState: {searchInput:'', sortBy:'hot'},
    reducers: {
        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        }
    }
});

export const { setSortBy } = searchBarSlice.actions;
export default searchBarSlice.reducer;