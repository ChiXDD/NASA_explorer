import { useTheme } from './ThemeContext'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

export const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.themeButton, { backgroundColor: theme.colors.buttons }]} onPress={toggleTheme}>
        <Text> {theme.dark ? '☀️' : '🌙'} </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  themeButton: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 45,
  },
})
