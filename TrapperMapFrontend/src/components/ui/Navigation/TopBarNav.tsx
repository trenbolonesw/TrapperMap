import { View,StyleSheet } from "react-native";
import Button from "../Basic/Button";

export default function TopBarNav(){
    return(
        <>
        <View style={styles.TabsContainer}>
        <Button Name="OverView"/>
        <Button Name="Traps"/>
        <Button Name="Map"/>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    TabsContainer:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        borderStyle:'solid',
        gap:5,
        borderWidth:1,
        borderColor:'#362b2b',
        padding:4,
        backgroundColor:'#1d1d2b',
      
    }
})
    