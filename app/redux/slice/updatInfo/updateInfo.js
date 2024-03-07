import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import updateInfoService from "./updateInfoService";
import AsyncStorage from "@react-native-async-storage/async-storage";


const initialUsersState = {
  phone_number: null,
  profile_image: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


// profile
export const profileImageInfo = createAsyncThunk(
  "updateInfo/profileImage",
  async (userdata, thunkAPI) => {
    try {
      return await updateInfoService.profileImage(userdata);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "updateInfo",
  initialState: initialUsersState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder

     
      // profile image
      .addCase(profileImageInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(profileImageInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile_image = action.payload;
      })
      .addCase(profileImageInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.profile_image = null;
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
