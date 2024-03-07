import React, { useState, useEffect} from 'react';
import { Text, View, Button, Platform } from 'react-native'; 
import { getIndieNotificationInbox, deleteIndieNotificationInbox } from 'native-notify';
import { useSelector} from "react-redux";

export default function PushNotify() {
  const [data, setData] = useState([]);
  const { user } = useSelector(
    (state) => state.auth
  );
  
   const getNotification =async () =>{
    let notifications = await getIndieNotificationInbox(`${user.data.d_user_id}`, 5244, 'ETIvDuED9iWCUgDvcbadVO');
    console.log("notifications: ", notifications);
    setData(notifications);
   }
 
  useEffect(() => {
    getNotification();
}, []);
  return (
    <View>
      <Text>Empty</Text>
    </View>
  )
}