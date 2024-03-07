import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import vehicleService from './vehicleService'
import AsyncStorage from "@react-native-async-storage/async-storage";
const initialState = {
  vehicles:[],
  isError: false,
  tempVehicle:[],
  vehicleByID:[],
  vehicleWithId:[],
  tempTrips:[],
  allTrips:[],
  vehicleIdTrip:[],
  TripId:[],
  tempUpdateTrip:[],
  isCancelled:false,
  isCreated: false,
  isSuccess: false,
  isLoading: false,
  isSent: false,
  isOrder:false,
  message: '',
}
     // create vehicle
     export const createVehicle=createAsyncThunk('vehicle/create', async(vehicleData,thunkAPI)=>{
        try{
         return await vehicleService.createVehicle(vehicleData)

        }catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
            return thunkAPI.rejectWithValue(message)
          }

     })

     export const getVehicleByHost= createAsyncThunk('vehicle/vehicleByHost', async(vehicleData,thunkAPI) => {
     try {
       return await vehicleService.getVehicleByHost(vehicleData)
     }
     catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }

     })

     
     export const getVehicle=createAsyncThunk('vehicle/getAllVehicles', async(thunkAPI)=>{
      try{
       return await vehicleService.getVehicleData()

      }catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)
        }

   })

   export const createTripRequest=createAsyncThunk('vehicle/createTrip', async(tripData,thunkAPI)=>{
    try{
     return await vehicleService.createTripsRequest(tripData)

    }catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }

 })


 export const getAllTripRequest=createAsyncThunk('vehicle/getAllTrip', async(thunkAPI)=>{
  try{
   return await vehicleService.getAllTripRequestApi();
   
  }catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }

})

 export const vehicleIdTrips=createAsyncThunk('vehicle/vehicleID',async(id,thunkAPI)=>{
  try{
    return await vehicleService.getAllTripByVehicleID(id);
   
  }catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }

})

export const TripbyId=createAsyncThunk('vehicle/TripID',async(id,thunkAPI)=>{
  try{
    return await vehicleService.getTripbyID(id);
   
  }catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }

})

export const updateTrip=createAsyncThunk('vehicle/updateTrips',async(userData,thunkAPI)=>{
  try{
    return await vehicleService.updateTripbyID(userData);
   
  }catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }

})

export const getVehicleWithId=createAsyncThunk('vehicle/withId',async(id,thunkAPI)=>{
  try{
    return await vehicleService.getVehicleByHostById(id);
   
  }catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }

})




export const vehicleSlice=createSlice({
    name:"vehicle",
    initialState,
    reducers:{
      reset: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.isOrder=false;
        state.isCreated=false;
        state.isCancelled=false;
        // state.tempTrips = [];
      },
      resetState: (state) => {
        state.tempTrips = [];
      }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createVehicle.pending, (state) => {
          state.isLoading = true
          state.isCreated = false

        })
        .addCase(createVehicle.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isCreated = true;
          state.tempVehicle = action.payload
          
        })
        .addCase(createVehicle.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.isCreated = false
        })
        .addCase(getVehicle.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getVehicle.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.vehicles=action.payload
        })
        .addCase(getVehicle.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(getVehicleByHost.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getVehicleByHost.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.vehicleByID=action.payload
        })
        .addCase(getVehicleByHost.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        .addCase(createTripRequest.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createTripRequest.fulfilled, (state, action) => {
          state.isLoading = false
          state.isOrder = true
          state.tempTrips=action.payload
        })
        .addCase(createTripRequest.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(getAllTripRequest.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getAllTripRequest.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess= true,
          state.allTrips=action.payload
        })
        .addCase(getAllTripRequest.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(vehicleIdTrips.pending, (state) => {
          state.isLoading = true
        })
        .addCase(vehicleIdTrips.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess= true
          state.vehicleIdTrip=action.payload
        })
        .addCase(vehicleIdTrips.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        .addCase(TripbyId.pending, (state) => {
          state.isLoading = true
        })
        .addCase(TripbyId.fulfilled, (state, action) => {
          state.isLoading = false
          state.TripId=action.payload
        })
        .addCase(TripbyId.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        .addCase(updateTrip.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updateTrip.fulfilled, (state, action) => {
          state.isLoading = false
          state.isCancelled = true
          state.isSuccess= true
          state.tempUpdateTrip=action.payload
         
        })
        .addCase(updateTrip.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        .addCase(getVehicleWithId.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getVehicleWithId.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess= true
          state.vehicleWithId=action.payload
         
        })
        .addCase(getVehicleWithId.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    }
    
})


export const { reset } = vehicleSlice.actions
export default vehicleSlice.reducer
