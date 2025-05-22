import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { fetchNeo } from '../../data/datasources/NeoWsApi'
import { useTheme } from '../../core/ThemeContext'

export default function NeoWsViewModel() {
  const [neos, setNeos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async (nextPage = 0) => {
    try {
      const data = await fetchNeo(nextPage)
      setNeos((prev) => [...prev, ...data])
      setPage(nextPage)
    } catch (error) {
      console.error('Error cargando NEOs:', error)
    } finally {
      setLoading(false)
      setIsFetchingMore(false)
    }
  }

  const handleLoadMore = () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true)
      loadData(page + 1)
    }
  }

  if (loading && neos.length === 0) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ color: theme.colors.text }}>Loading Near Earth Objects...</Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text, marginBottom: 8 }}>Most Recent Near Earth Objects</Text>
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
        onEndReached={handleLoadMore}
        ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" /> : null}
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
