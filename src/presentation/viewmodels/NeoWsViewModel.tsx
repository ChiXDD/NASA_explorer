// NEOScreen.tsx
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { fetchNeo } from '../../data/datasources/NeoWsApi'
import { useTheme } from '../../core/ThemeContext'

export default function NeoWsViewModel() {
  const [neos, setNeos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchNeo()
        setNeos(data)
      } catch (error) {
        console.error('Error cargando NEOs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ color: theme.colors.text }}>Loading Near Earth Objects...</Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text }}>Most Recent Near Earth Objects</Text>
      <FlatList
        data={neos}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={[styles.item]}>
            <Text style={[styles.name, { color: theme.colors.text }]}>
              {index + 1}. {item.name}
            </Text>
            <Text style={{ color: theme.colors.text }}>Estimated minimum diameter: {item.diameterMin.toFixed(2)} m</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
