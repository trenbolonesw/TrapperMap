import { Pressable,StyleSheet, Text } from "react-native";

type ButtonType = {
    Name:string
}


export default function Button({Name}:ButtonType){
    return(
        <>
        <Pressable style={styles.Button}><Text style={styles.Text}>{Name}</Text></Pressable>
        </>
    )
}


const styles = StyleSheet.create({
    Button:{
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#362b2b',
        padding:4,
        borderRadius:10,
        backgroundColor:'#191f42',
        fontWeight:600,
        fontFamily:'sans-serif'
    },
    Text:{
        color:'#fcfcfc'
    }
})
    

