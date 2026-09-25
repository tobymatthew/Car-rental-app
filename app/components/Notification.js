// import { View, Text } from 'react-native'
// import React,{useState, useEffect} from 'react'
// import * as Notifications from 'expo-notifications';
// import storage from "@react-native-async-storage/async-storage";
// import * as Device from 'expo-device';


// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true,
//       shouldPlaySound: true,
//       shouldSetBadge: true
//     })
//   });

// export default function Notification() {
//     const [notifications, setNotifications] = useState(false);
//     const notificationListener = useRef();
//     const responseListener = useRef();

  


//   useEffect(()=>{
//     const getPermission = async () => {
//         if (Device.isDevice) {
//             const { status: existingStatus } = await Notifications.getPermissionsAsync();
//             let finalStatus = existingStatus;
//             if (existingStatus !== 'granted') {
//               const { status } = await Notifications.requestPermissionsAsync();
//               finalStatus = status;
//             }
//             if (finalStatus !== 'granted') {
//               alert('Enable push notifications to use the app!');
//               await storage.setItem('expopushtoken', "");
//               return;
//             }
//             const token = (await Notifications.getExpoPushTokenAsync()).data;
//             await storage.setItem('expopushtoken', token);
//         } else {
//           alert('Must use physical device for Push Notifications');
//         }
  
//           if (Platform.OS === 'android') {
//             Notifications.setNotificationChannelAsync('default', {
//               name: 'default',
//               importance: Notifications.AndroidImportance.MAX,
//               vibrationPattern: [0, 250, 250, 250],
//               lightColor: '#FF231F7C',
//             });
//           }
//       }
//       getPermission();
//       notificationListener.current = Notifications.addNotificationReceivedListener(notifications => {
//         setNotifications(notifications);
//       });
  
//       responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {});
  
//       return () => {
//         Notifications.removeNotificationSubscription(notificationListener.current);
//         Notifications.removeNotificationSubscription(responseListener.current);
//       };
     
//   }, [])

//   const onClick = async () => {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Title",
//         body: "body",
//         data: { data: "data goes here" }
//       },
//       trigger: {
//         hour: 7,
//         minute: 0,
//         repeats: false
//       }
//     });
//   }
//    }