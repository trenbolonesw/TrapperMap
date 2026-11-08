import { Link, RelativePathString } from "expo-router"
import { StyleSheet } from "react-native"

type NavLinkType = {
    pathName:string,
    href:RelativePathString
}

export default function NavLink({href,pathName}:NavLinkType){
    return(
        <Link style={styles.Link} href={href}>{pathName}</Link>
    )
}

const styles = StyleSheet.create({
    Link:{
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#362b2b',
        padding:4,
        borderRadius:10,
        backgroundColor:'#1d1d2b',
        color:'#FFFF',
        fontWeight:600,
        fontFamily:'sans-serif'
    }
})
    

