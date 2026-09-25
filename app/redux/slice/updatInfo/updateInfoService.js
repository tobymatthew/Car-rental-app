import endPoint from "../../../api/endpoint";
import client from "../../../api/client";
import {useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const updateProfileImageAPI = "/api/update_profile_pic/:id";



const profileImage = async (userData) => {
  const config = {
    body: formData,
    header: {
      "content-type": "multipart/form-data",
    },
  };

  const response = await axios.put(API_URL, userData, config);

  return response.data;
};
const updateInfoService = {
  updateFirstName,
  updateLastName,
  profileImage
};

export default updateInfoService;
