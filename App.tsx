import { HomeScreen } from './src/presentation/screens/HomeScreen'
import NeoWsScreen from './src/presentation/screens/NeoWsScreen'
import EPICScreen from './src/presentation/screens/EPICScreen'
import MarsRoverScreen from './src/presentation/screens/MarsRoverView'
import LibraryScreen from './src/presentation/screens/LibraryScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeStackParamList } from './src/navigation/types'
import { ROUTES } from './src/core/routes'
import { ThemeProvider, useTheme } from './src/core/ThemeContext'
import { ThemeButton } from './src/core/ThemeButton'

const Drawer = createDrawerNavigator<HomeStackParamList>()
const Tab = createBottomTabNavigator<HomeStackParamList>()

function EpicRoverTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarIconStyle: { display: 'none' }, tabBarStyle: { backgroundColor: '#670D2F'}, tabBarActiveTintColor: 'white', tabBarInactiveTintColor: 'white', tabBarLabelStyle: { fontSize: 20 }, animation: 'shift' }}>
      <Tab.Screen name={ROUTES.EPIC} component={EPICScreen} />
      <Tab.Screen name={ROUTES.Rover} component={MarsRoverScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName={ROUTES.Home} screenOptions={{ headerStyle: { backgroundColor: '#670D2F' }, headerTintColor: 'white', drawerStyle: { backgroundColor: '#670D2F' }, drawerActiveBackgroundColor: '#31363F', headerTitleAlign: 'center', drawerLabelStyle: {color: 'white', fontSize: 17}, headerRight: () => <ThemeButton /> }}>
          <Drawer.Screen name={ROUTES.Home} component={HomeScreen} />
          <Drawer.Screen name={ROUTES['EPIC & Rover']} component={EpicRoverTabs} />
          <Drawer.Screen name={ROUTES.NeoWs} component={NeoWsScreen} />
          <Drawer.Screen name={ROUTES.Library} component={LibraryScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}
