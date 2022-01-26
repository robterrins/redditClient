import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  searchTerm: "",
}

export const searchBarSlice = createSlice({
  name: "searchBarSlice",
  initialState,
  reducers: {
    setSearchTerm(state, action){
      state.searchTerm = action.payload
    },
  },
})

export const {
  setSearchTerm,
} = searchBarSlice.actions;

export default searchBarSlice.reducer;
