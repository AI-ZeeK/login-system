import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialTypes {
  user: any | null;
}
const initialState: InitialTypes = {
  user: {},
};

export const AppSlice = createSlice({
  name: "APP",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      console.log(payload, "slice");
      state.user = payload;
    },
  },
});

export const { setUser } = AppSlice.actions;
export default AppSlice.reducer;
