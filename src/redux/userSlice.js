import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, getUserInfo, updateUserNameAPI } from "../utils/api";

export const loginThunk = createAsyncThunk(
  "user/loginThunk",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginUser(email, password);
      if (response.status === "failed") {
        return thunkAPI.rejectWithValue(response.error);
      }
      localStorage.setItem("token", response.body.token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserInfoThunk = createAsyncThunk(
  "user/getUserInfoThunk",
  async (token, thunkAPI) => {
    try {
      const response = await getUserInfo(token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUserNameThunk = createAsyncThunk(
  "user/updateUserNameThunk",
  async ({ token, newUserName }, thunkAPI) => {
    try {
      const response = await updateUserNameAPI(token, newUserName);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
    rememberMe: JSON.parse(localStorage.getItem("rememberMe")) || false,
    logged: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.logged = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("rememberMe");
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
      localStorage.setItem("rememberMe", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.body.token;
        state.logged = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getUserInfoThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.body;
        if (state.rememberMe) {
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(getUserInfoThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserNameThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.user) {
          state.user.userName = action.payload.body.userName;
          if (state.rememberMe) {
            localStorage.setItem("user", JSON.stringify(state.user));
          }
        }
      })
      .addCase(updateUserNameThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, setRememberMe } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const selectLogged = (state) => state.user.logged;
export const selectRememberMe = (state) => state.user.rememberMe;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
