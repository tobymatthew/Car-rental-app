import { View, Text } from "react-native";
import React,{useEffect} from "react";
import { PayWithFlutterwave } from "flutterwave-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { updateTrip, reset } from "../redux/slice/vehicle/Vehicles";
import ButtonLong from "./ButtonLong";
export default function Payment({total}) {

  const dispatch= useDispatch();
  const {tempUpdateTrip,isError, isSuccess, message } = useSelector(
    (state) => state.vehicles
  );

  const {user}=useSelector((state)=>state.auth);

  const mail = user.data.d_email;

  console.log(mail);

  const navigation= useNavigation();
    const handleOnRedirect = (props) => {
       
    
         if (props.status==='successful'){
          // alert('Success');
           
           const values= {
           query:"d_is_paid",
           value:1
       }
        dispatch(updateTrip(values))

      

         }

         else if (props.status==='cancelled') {
          
         }
       
      
    
    

     
     }

     const handleOnAbort=()=>{
      alert("Payed");
     }
     
     const generateRef = (length) => {
         var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
         var b = [];  
         for (var i=0; i<length; i++) {
             var j = (Math.random() * (a.length-1)).toFixed(0);
             b[i] = a[j];
         }
         return b.join("");
     }

     useEffect(() => {
      if (isError) {
        console.log(message);
      }
  
      if(isSuccess){
         console.log("success");
         navigation.navigate("HostContact");
      }
      dispatch(reset());
    }, [reset, isSuccess,isError,message]);

  return (
    <View>
      <PayWithFlutterwave
        onRedirect={handleOnRedirect}
        options={{
          tx_ref: generateRef(11),
          authorization: "FLWPUBK-a0774d14ba9c43f973138cf32da18ac4-X",
          customer: {
            email: `${mail}`,
          },
          amount: total,
          currency: "NGN",
          payment_options: "card",
        }}
        customButton={(props) => (
           <ButtonLong title="Pay"  onPress={props.onPress}/>
        )}
      />
    </View>
  );
}
