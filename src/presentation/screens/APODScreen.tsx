// APODScreen.tsx
import { View, Text, StyleSheet } from 'react-native'
import { APODViewModel } from '../viewmodels/APODViewModel'
import { useTheme } from '../../core/ThemeContext'

export default function APODScreen() {
  const { theme, toggleTheme } = useTheme()

  return (
    <View>
      <Text style={[styles.text, { color: theme.colors.text }]}>Check out the Astronomy Picture of the Day!</Text>
      <APODViewModel />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
