import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { fetchMarsPhotos } from '../../data/datasources/MarsRoverApi'
import { useTheme } from '../../core/ThemeContext'

export default function MarsRoverViewModel() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [photos, setPhotos] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const { theme } = useTheme()

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)
    return `${year}-${month}-${day}`
  }

  const loadPhotos = async (reset = false) => {
    if (loading) return
    setLoading(true)
    try {
      const date = formatDate(selectedDate)
      const data = await fetchMarsPhotos(date, reset ? 1 : page)
      if (reset) {
        setPhotos(data)
        setPage(2)
      } else {
        setPhotos((prev) => [...prev, ...data])
        setPage((prev) => prev + 1)
      }
      setHasMore(data.length > 0)
    } catch (error) {
      Alert.alert('Error', 'Could not fetch Mars photos. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPhotos(true)
  }, [selectedDate])

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.photoContainer}>
      <Text style={[styles.caption, { color: theme.colors.text }]}>
        {index + 1}. {item.camera.full_name}
      </Text>
      <Image source={{ uri: item.img_src }} style={styles.image} />
      <Text style={[styles.date, { color: theme.colors.text }]}>Earth Date: {item.earth_date}</Text>
      <Text style={[styles.date, { color: theme.colors.text }]}>Sol (Mars Day): {item.sol}</Text>
    </View>
  )

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Mars Rover Photos</Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>Select a date and see all the Mars photos from that day!</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.buttons }]} onPress={() => setShowPicker(true)}>
        <Text style={[styles.text, { color: theme.colors.text }]}>Select a date 📅</Text>
      </TouchableOpacity>
      <Text style={[styles.text, { color: theme.colors.text }]}>Selected date: {formatDate(selectedDate)}</Text>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, date) => {
            setShowPicker(false)
            if (date) {
              setSelectedDate(date)
            }
          }}
        />
      )}

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={[styles.text, { color: theme.colors.text }]}>Loading...</Text>
        </View>
      )}

      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={() => {
          if (hasMore && !loading) loadPhotos()
        }}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
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
  },
  button: {
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  photoContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginTop: 8,
  },
  caption: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  loading: {
    marginTop: 20,
  },
})
