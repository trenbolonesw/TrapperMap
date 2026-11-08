import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Text, useColorScheme, View } from 'react-native';
import { AppLayout } from '@/components/ui/Layout/AppLayout';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  return (
    <>
<AppLayout/>
   <Stack>
     <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
    <Stack.Screen name='Dashboard' options={{headerShown:false}}/>
   </Stack>
 </>
  );
}

