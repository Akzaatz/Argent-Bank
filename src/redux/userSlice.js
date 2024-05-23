import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../utils/api";

export const loginAsync = createAsyncThunk(
  "user/loginAsync",
  async ({ name, password }, thunkAPI) => {
    const response = await loginUser(name, password);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    logged: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
      state.logged = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.logged = true;
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.logged = false;
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectLogged = (state) => state.user.logged;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
export default userSlice.reducer;