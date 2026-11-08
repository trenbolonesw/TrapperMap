import { Text, View } from "react-native";
import { DashLayoutstyles } from "./styles";
import { Mapping } from "@/components/map/map";
import TopBarNav from "../Navigation/TopBarNav";
export function DashLayout(){
    return(
        <View style={DashLayoutstyles.container}>
        <TopBarNav/>
        <Mapping/>
        </View>
    )
}

