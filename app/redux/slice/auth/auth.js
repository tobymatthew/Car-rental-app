import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";



const initialUsersState = {
  user: () => {
    try {
      if (!null) {
        return JSON.parse(AsyncStorage.getItem("user"));
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  },
  tempotpVerify:[],
  tempotp:[],

  tempEmail:[],

  userID:[],
  account:[],
  license:[],
  tempNumber:[],
  tempProfile:[],
  tempLicense:[],
  tempDelete:[],
  logoutState:false,
  isprofile:false,
  isError: false,
  isSuccess: false,
  verifyisSuccess: false,
  isVerified: false,
  isEmail:false,
  isLoading: false,
  isDeleted:false,
  message: "",
};

// Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// update first name
export const updateFirstNameInfo = createAsyncThunk(
  "auth/updateFirstname",
  async (userdata, thunkAPI) => {
    try {
      return await authService.updateFirstName(userdata);
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
// verify otp
export const otpVerify = createAsyncThunk(
  "auth/otpVerify",
  async (userdata, thunkAPI) => {
    try {
      return await authService.verifyOtp(userdata);
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

export const otpPhone = createAsyncThunk(
  "auth/otpPhone",
  async (userdata, thunkAPI) => {
    try {
      return await authService.verifyOtpNumber(userdata);
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


//update last name
export const updateLastNameInfo = createAsyncThunk(
  "auth/updateLastName",
  async (userdata,thunkAPI) => {
    try {
      return await authService.updateLastName(userdata);
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

 // passwordReset
export const PasswordReset = createAsyncThunk(
  "auth/passwordReset",
  async (userdata,thunkAPI) => {
    try {
      return await authService.passwordReset(userdata);
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

 // Account number
 export const AccountNumberInfo = createAsyncThunk(
  "auth/accountNumber",
  async (userdata,thunkAPI) => {
    try {
      return await authService.account(userdata);
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

// verify license 
export const licenseInfo = createAsyncThunk(
  "auth/license",
  async (userdata,thunkAPI) => {
    try {
      return await authService.license(userdata);
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

 // profile photo

 export const profileInfo = createAsyncThunk(
  "auth/profile",
  async (userdata,thunkAPI) => {
    try {
      return await authService.profileInfoAPi(userdata);
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
)
 
// update number

export const numberInfo = createAsyncThunk(
  "auth/numberInfo",
  async (userdata,thunkAPI) => {
    try {
      return await authService.number(userdata);
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
)

export const bvnInfo = createAsyncThunk(
  "auth/bvnInfo",
  async (userdata,thunkAPI) => {
    try {
      return await authService.bvnNumber(userdata);
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
)

 // userID
 export const userIDInfo = createAsyncThunk( 
  'auth/userIDInfo',
  async (thunkAPI) => {
    try {
      return await authService.userID();
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

 // get user by email
 export const userByEmail = createAsyncThunk( 
  'auth/userByEmail',
  async (email,thunkAPI) => {
    try {
      return await authService.getUserByEmail(email);
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

// request otp
export const requestOtp = createAsyncThunk( 
  'auth/requestOtp',
  async (userData,thunkAPI) => {
    try {
      return await authService.requestOtp(userData);
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

export const verifyLicenseInfo = createAsyncThunk( 
  'auth/verifyLicenseInfo',
  async (id,thunkAPI) => {
    try {
      return await authService.verifyLicense(id);
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

export const DeleteUser = createAsyncThunk( 
  'auth/delete-user',
  async (userData,thunkAPI) => {
    try {
      return await authService.deleteUser(userData);
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

export const DeleteInfo = createAsyncThunk( 
  'auth/delete-users',
  async (userData,thunkAPI) => {
    try {
      return await authService.deleteUser(userData);
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
  name: "auth",
  initialState: initialUsersState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.verifyisSuccess=false;
      state.isDeleted=false;
      state.logoutState=false;
    //   state.tempotpVerify=[],
    //   state.tempotp=[],
    
    //   state.tempEmail=[],
    
    //   state.userID=[],
    //   state.account=[],
    //  state.license=[],
    //   state.tempNumber=[],
    //  state.tempProfile=[],
    //  state.tempLicense=[]
     //  state. tempDelete=[]
    },
  },

  extraReducers: (builder) => {
    builder
      //register user

      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // login user
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutState = true;
        state.user = null;
      })
      // update first name

      .addCase(updateFirstNameInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFirstNameInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user.d_first_name = action.payload;
      })
      .addCase(updateFirstNameInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // update last name

      .addCase(updateLastNameInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLastNameInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateLastNameInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      
      })

      // update password
      .addCase(PasswordReset.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(PasswordReset.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(PasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        
      })

      .addCase(userIDInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userIDInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userID = action.payload;
      })
      .addCase(userIDInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        
      })

      // AccountNumber

      .addCase(AccountNumberInfo.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(AccountNumberInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess=true;
        state.account = action.payload;
      })

      .addCase(AccountNumberInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        
      })

      // Profile info
      .addCase(profileInfo.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(profileInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isprofile = true;
        state.tempProfile= action.payload
      })

      .addCase(profileInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        
      })

       //number
      .addCase(numberInfo.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(numberInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tempNumber= action.payload
      })

      .addCase(numberInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        
      })

      .addCase(bvnInfo.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(bvnInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tempNumber= action.payload
      })

      .addCase(bvnInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        
      })

      .addCase(otpVerify.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(otpVerify.fulfilled, (state, action) => {
        state.isLoading = false;
        state. verifyisSuccess = true;
        state.tempotpVerify= action.payload 
      })

      .addCase(otpVerify.rejected, (state, action) => {
        state.isLoading = false;
        state.verifyisSuccess = false;
        state.isError = true;
        state.message = action.payload;
        
      })

      .addCase(otpPhone.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(otpPhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state. verifyisSuccess = true;
        state.tempotpVerify= action.payload
      })

      .addCase(otpPhone.rejected, (state, action) => {
        state.isLoading = false;
        state.verifyisSuccess = false;
        state.isError = true;
        state.message = action.payload;
        
      })

      .addCase(userByEmail.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(userByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isEmail = true;
        state.tempEmail= action.payload
      })

      .addCase(userByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        
      })

      .addCase(requestOtp.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(requestOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tempotp= action.payload
      })

      .addCase(requestOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        
      })
      .addCase(verifyLicenseInfo.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(verifyLicenseInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isVerified = true;
        state.tempLicense= action.payload
      })

      .addCase(verifyLicenseInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isVerified = false;
        state.isError = true;
        state.message = action.payload;
        
      })

      .addCase( DeleteInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase( DeleteInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.tempDelete= action.payload
      })
      .addCase( DeleteInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted =false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
