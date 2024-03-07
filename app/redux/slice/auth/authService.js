import endPoint from "../../../api/endpoint";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSelector} from "react-redux";
const signUpURL = "/api/signup";
const LoginURL= "/api/login";


// Register User

const register = async (values) => {
  try {
    const response = await endPoint.post(signUpURL, values);
    if (response.data) {
      const result = JSON.stringify(response.data);
      await AsyncStorage.setItem("user", result);
      
    }

    return response.data;
    
  } catch (err) {
    console.log(err);
  }
};


  // Login user
const login = async (userData) => {
  const response = await endPoint.post(LoginURL, userData)

  if (response.data) {
    const result = JSON.stringify(response.data);
    await AsyncStorage.setItem("user", result);
  }

  return response.data;
}

  // logout user

  const logout =async () => {
   await AsyncStorage.removeItem('user')
  }

  const updateFirstName = async (userData) => {
    let result= await AsyncStorage.getItem("user");
    result = JSON.parse(result);
    let id = result.data.d_user_id;
    const updateFirstnameAPI = `/api/update_first_name/${id}`;
    const response = await endPoint.put(updateFirstnameAPI, userData);
   
    return response.data;
  };
  
  const updateLastName = async (userData) => {
    let result= await AsyncStorage.getItem("user");
    result = JSON.parse(result);
    let id = result.data.d_user_id;
    const updateLastNameAPI =  `/api/update_last_name/${id}`
    const response = await endPoint.put( updateLastNameAPI, userData);    
    return response.data;
  };

  

   const userID= async () => {
    let result= await AsyncStorage.getItem("user");
    result = JSON.parse(result);
    let id = result.data.d_user_id;
    const getAPI = `/api/get_user_by_id/${id}`
    const response = await endPoint.get(getAPI);
    return response.data;
   }

   const account = async(userData) => {

    let result= await AsyncStorage.getItem("user");
    result = JSON.parse(result);
    let id = result.data.d_user_id;
    const getAPI = `/api/acc_details/${id}`
    const response = await endPoint.post(getAPI, userData);
    return response.data;

   }

   const profileInfoAPi= async (userData) =>{
    let result= await AsyncStorage.getItem("user");
    result = JSON.parse(result);
    let id = result.data.d_user_id;
    const profileAPI = `/api/update_profile_pic/${id}`
    const response = await endPoint.put(profileAPI, userData);
    return response.data;
   }

   const number = async (userData)=>{
    let result= await AsyncStorage.getItem("user");
    result = JSON.parse(result);
    let id = result.data.d_user_id;
    const numberAPI = `/api/verify_and_update_phone_number/${id}`
    const response = await endPoint.post(numberAPI, userData);
    return response.data;
   }

   const bvnNumber = async (userData)=> {
    let result= await AsyncStorage.getItem("user");
    result = JSON.parse(result);
    let id = result.data.d_user_id;
    const numberAPI = `/api/verify_and_update_bvn_number/${id}`
    const response = await endPoint.post(numberAPI, userData);
    return response.data;
   }

   const verifyOtp= async (userData) => {
    const verifyOtpAPI = `/api/verify_otp`
    const response = await endPoint.post(verifyOtpAPI, userData);
    return response.data;
   }

   const verifyOtpNumber= async (userData) => {
    const verifyOtpAPI = `/api/verify_otp`
    const response = await endPoint.post(verifyOtpAPI, userData);
    return response.data;
   }

   const getUserByEmail = async(email) =>{
    const response = await endPoint.get(`/api/get_user_by_email/${email}`);
    if(response.data){
    const result = JSON.stringify(response.data);
    await AsyncStorage.setItem("mail", result);
    return response.data;
    }
   
   }

   const passwordReset= async (userData) => {
    let result= await AsyncStorage.getItem("mail");
    let check = JSON.parse(result);
    let id = check.data.d_user_id;
    const passwordResetAPI = `/api/password_reset/${id}`
    const response = await endPoint.post(passwordResetAPI, userData);
    return response.data;
   }

   const requestOtp= async (userData) => {
    const verifyOtpAPI = `/api/request_otp`
    const response = await endPoint.post(verifyOtpAPI, userData);
    return response.data;
   }

   const  verifyLicense= async (id) => {
  
    const LicenseAPI = `/api/verify_drivers_license/`
    const response = await endPoint.post(LicenseAPI,id);
    return response.data;
   }



   const deleteUser= async(userData)=>{
    let result= await AsyncStorage.getItem("user");
    result = JSON.parse(result);
    let id = result.data.d_user_id;
    const deleteUserApi= `/api/user/delete/${id}`
    const response = await endPoint.delete(deleteUserApi,{data:userData});
    return response.data;
   }

const authService = {
  register,
  logout,
  login,
  updateFirstName,
  updateLastName,
  passwordReset,
  userID,
  account,
  profileInfoAPi,
  number,
  verifyOtp,
  getUserByEmail,
  requestOtp,
  verifyLicense,
  deleteUser,
  bvnNumber,
  verifyOtpNumber
};

export default authService;
