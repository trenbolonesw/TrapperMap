import * as Device from 'expo-device';
import { Platform, StyleSheet, View,Text } from 'react-native';


import { RealTimeMap } from '@/components/map/realTimeMap';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { Mapping } from '@/components/map/map';
import MaterialCommunity from '@expo/vector-icons/MaterialCommunityIcons';

// function getDevMenuHint() {
//   if (Platform.OS === 'web') {
//     return;
//   }
//   if (Device.isDevice) {
//     return (
      
//     );
//   }

  
// }

export default function HomeScreen() {
  return (
  <View style={styles.container}>
      <Text style={styles.outerText}>Welcome To <Text style={styles.innerText}>TrapperMap</Text></Text>
      <MaterialCommunity name='map' style={styles.icon}/>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
   flex:0.7,
   flexDirection:'row',
   alignItems:'center',
   justifyContent:'center',
   
   
  },
  outerText:{
    left:10,
    fontSize:30,
    
  },
  innerText:{
   fontWeight:600,
   color:'#172142'
  },
  icon:{
    right:10, 
   fontSize:100
  }
})