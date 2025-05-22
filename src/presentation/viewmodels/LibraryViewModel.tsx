import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TextInput, Image, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
import { fetchLibrary } from '../../data/datasources/LibraryApi'
import { useTheme } from '../../core/ThemeContext'

export default function LibraryViewModel() {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { theme } = useTheme()

  const handleSearch = async () => {
    if (!keyword.trim()) return
    setLoading(true)
    setResults([])
    try {
      const data = await fetchLibrary(keyword)
      setResults(data)
    } catch (error) {
      Alert.alert('Error', 'Could not fetch media from NASA.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearch()
  }, [keyword])

  const renderItem = ({ item }: any) => {
    const data = item.data?.[0]
    const links = item.links || []

    return (
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.title, { color: theme.colors.textAlt }]}>{data?.title}</Text>
        <Text style={[styles.date, { color: theme.colors.textAlt }]}>{data?.date_created}</Text>
        <Text style={[styles.description, { color: theme.colors.textAlt }]}>{data?.description}</Text>
        {links.map((link: any, index: number) => (
          <Image key={index} source={{ uri: link.href }} style={styles.image} resizeMode="cover" />
        ))}
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>NASA Image Library</Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>Enter a keyword and see all the nasa archives!</Text>
      <TextInput placeholder="Enter a keyword..." placeholderTextColor={theme.colors.text} style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.text }]} value={keyword} onChangeText={setKeyword} />
      {loading ? <ActivityIndicator size="large" color={theme.colors.primary} /> : <FlatList data={results} keyExtractor={(item, index) => index.toString()} renderItem={renderItem} contentContainerStyle={styles.list} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  list: {
    gap: 20,
  },
  card: {
    borderRadius: 8,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'justify',
    lineHeight: 22,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
})
