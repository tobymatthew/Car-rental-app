import { configureStore,combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import authReducer from '../slice/auth/auth'
import vehicleReducer from '../slice/vehicle/Vehicles'
import AsyncStorage from "@react-native-async-storage/async-storage";
const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
  version: 1,
  whitelist:['auth','vehicles']
}

const rootReducer=combineReducers({
  auth:authReducer,
  vehicles:vehicleReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store= configureStore({
    reducer:persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }),
})


 export const persistor = persistStore(store)
