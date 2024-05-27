import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../utils/api";

export const loginAsync = createAsyncThunk(
  "user/loginAsync",
  async ({ name, password }, thunkAPI) => {
    const response = await loginUser(name, password);
    return response;
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "idle",
  error: null,
  rememberMe: JSON.parse(localStorage.getItem("rememberMe")) || false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
      state.logged = false;
      if (!state.rememberMe) {
        localStorage.removeItem("user");
      }
      localStorage.removeItem("rememberMe");
      state.rememberMe = false;
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
      localStorage.setItem("rememberMe", JSON.stringify(action.payload));
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
        if (state.rememberMe) {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.logged = false;
      });
  },
});

export const { logout, setRememberMe } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectLogged = (state) => state.user.logged;
export const selectRememberMe = (state) => state.user.rememberMe;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
export default userSlice.reducer;
