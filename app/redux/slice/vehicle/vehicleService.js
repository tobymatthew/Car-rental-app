import endPoint from "../../../api/endpoint";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getVehicleAPI = "/api/admin/vehicles";

const createVehicle = async (userData) => {
  let result = await AsyncStorage.getItem("user");
  result = JSON.parse(result);
  let id = result.data.d_user_id;
  const createVehicleAPI = `api/host_list_car/${id}`;
  const response = await endPoint.post(createVehicleAPI, userData);

  return response.data;
};
const getVehicleData = async () => {
  const response = await endPoint.get(getVehicleAPI);

  return response.data;
};

const getVehicleByHost = async () => {
  let result = await AsyncStorage.getItem("user");
  result = JSON.parse(result);
  let id = result.data.d_user_id;
  const getVehicleByHostAPI = `api/get_host_vehicles/${id}`;
  const response = await endPoint.get(getVehicleByHostAPI);

  return response.data;
};

const getVehicleByHostById = async (id) => {
 
  const response = await endPoint.get(`api/get_host_vehicles/${id}`);

  return response.data;
};


const createTripsRequest = async (userData) => {
  const tripApi = "api/trips";

  const response = await endPoint.post(tripApi, userData);

  return response.data;
};

const getAllTripRequestApi = async () => {
  let result = await AsyncStorage.getItem("user");
  result = JSON.parse(result);
  let id = result.data.d_user_id;
  const tripApi = `api/trips/all/${id}`;
  const response = await endPoint.get(tripApi);
  return response.data;
};

// const getAllTripByVehicleID = async (id) => {
//   for (const ids of id) {
//     const response = await endPoint.get(`/api/trips/vehicle/${ids}`);

//    return response.data
//   }
 
// };

const getAllTripByVehicleID = async (id) => {
  let results=[]

  for (const ids of id) {
   const response = await endPoint.get(`/api/trips/vehicle/${ids}`);
   results.push(response.data);
  }

  return results
 
};

const getTripbyID = async (id) => {
  const response = await endPoint.get(`/api/trips/${id}`);

  return response.data;
};

const updateTripbyID = async (userData) => {

  const id= await AsyncStorage.getItem("tripId");
  
   const response = await endPoint.put(`/api/trips/${id}`,userData);
  return response.data;
};

const vehicleService = {
  createVehicle,
  getVehicleData,
  getVehicleByHost,
  createTripsRequest,
  getAllTripRequestApi,
  getAllTripByVehicleID,
  getTripbyID,
  updateTripbyID,
  getVehicleByHostById
};

export default vehicleService;
