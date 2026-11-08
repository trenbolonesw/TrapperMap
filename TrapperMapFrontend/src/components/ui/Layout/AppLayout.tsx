
import { View,StyleSheet } from "react-native";
import NavLink from "../Navigation/Link";
export function AppLayout(){


//create component with navigation

    return(
        <View style={styles.container}>
        <NavLink pathName="Home" href={'./'}/>
        <NavLink pathName="DashBoard" href={'./Dashboard'}/>
        <NavLink pathName="Profile" href={'./Profile'}/>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#0d0d0e',
    padding:10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    gap:10,
    
  },
 
  title: {
    color:'#FFF',
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
 
});