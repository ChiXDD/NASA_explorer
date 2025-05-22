import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../../navigation/types'
import APODScreen from './APODScreen'
import { useTheme } from '../../core/ThemeContext'

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>

export const HomeScreen = ({ navigation }: Props) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <ScrollView contentContainerStyle={[{ backgroundColor: theme.colors.background }]}>
      <View style={styles.buttonsContainer}>
        <Text style={[styles.text, { color: theme.colors.text }]}>Welcome to NASA explorer</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NeoWs')} style={[styles.button, { backgroundColor: theme.colors.buttons }]}>
          <Text style={[styles.text, { color: theme.colors.text }]}>Near Earth Objects</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('EPIC & Rover')} style={[styles.button, { backgroundColor: theme.colors.buttons }]}>
          <Text style={[styles.text, { color: theme.colors.text }]}>EPIC & Rover Library</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Library')} style={[styles.button, { backgroundColor: theme.colors.buttons }]}>
          <Text style={[styles.text, { color: theme.colors.text }]}>Image Library</Text>
        </TouchableOpacity>
      </View>

      <View>
        <APODScreen />
      </View>

      <StatusBar />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 50,
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 15,
    gap: 15,
  },
  button: {
    borderRadius: 8,
    padding: 15,
    width: 300,
    alignItems: 'center',
  },
  themeButton: {
    borderRadius: 8,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    right: 20,
    height: 45,
    width: 45,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
