import { HomeScreen } from './src/presentation/screens/HomeScreen'
import APODScreen from './src/presentation/screens/APODScreen'
import NeoWsScreen from './src/presentation/screens/NeoWsScreen'
import EPICScreen from './src/presentation/screens/EPICScreen'
import MarsRoverScreen from './src/presentation/screens/MarsRoverView'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeStackParamList } from './src/navigation/types'
import { ROUTES } from './src/core/routes'
import { ThemeProvider } from './src/core/ThemeContext'

const Stack = createNativeStackNavigator<HomeStackParamList>()

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ROUTES.Home}>
          <Stack.Screen name={ROUTES.Home} component={HomeScreen} />
          <Stack.Screen name={ROUTES.APOD} component={APODScreen} />
          <Stack.Screen name={ROUTES.NeoWs} component={NeoWsScreen} />
          <Stack.Screen name={ROUTES.EPIC} component={EPICScreen} />
          <Stack.Screen name={ROUTES.Rover} component={MarsRoverScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}
