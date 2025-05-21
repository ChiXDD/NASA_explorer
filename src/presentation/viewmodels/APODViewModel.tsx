// APODScreen.tsx
import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import { fetchAPOD } from '../../data/datasources/APODApi'
import { useTheme } from '../../core/ThemeContext'

export const APODViewModel = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const loadData = async () => {
      try {
        const apodData = await fetchAPOD()
        setData(apodData)
      } catch (error) {
        console.error('Error loading picture of the day:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading picture of the day...</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.textAlt }]}>{data.title}</Text>
      {data.media_type === 'image' && <Image source={{ uri: data.url }} style={styles.image} />}
      <Text style={[styles.date, { color: theme.colors.textAlt }]}>{data.date}</Text>
      <Text style={[styles.explanation, { color: theme.colors.textAlt }]}>{data.explanation}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'justify',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    marginVertical: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginVertical: 10,
  },
  explanation: {
    fontSize: 18,
    textAlign: 'justify',
    lineHeight: 30,
  },
})
