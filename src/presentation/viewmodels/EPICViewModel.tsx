import React, { useState, useEffect } from 'react'
import { View, Text, Image, ActivityIndicator, StyleSheet, Alert, ScrollView, Platform, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { fetchEPIC } from '../../data/datasources/EPICApi'
import { useTheme } from '../../core/ThemeContext'

export default function EPICViewModel() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [imageData, setImageData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { theme } = useTheme()

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)
    return `${year}-${month}-${day}`
  }

  const handleSearch = async (date: Date) => {
    setLoading(true)
    setImageData(null)
    try {
      const formattedDate = formatDate(date)
      const data = await fetchEPIC(formattedDate)
      if (data) {
        setImageData(data)
      }
    } catch (error) {
      Alert.alert('Error', 'Could not fetch image data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearch(selectedDate)
  }, [selectedDate])

  const getImageUrl = (imageName: string, date: string) => {
    const [year, month, day] = date.split(' ')[0].split('-')
    return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${imageName}.jpg`
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Earth Polychromatic Imaging Camera</Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>Select a date and see what photo of the Earth NASA took that day!</Text>

      <TouchableOpacity style={[styles.buttons, { backgroundColor: theme.colors.buttons }]} onPress={() => setShowPicker(true)}>
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
            if (date) setSelectedDate(date)
          }}
        />
      )}

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={[styles.text, { color: theme.colors.text }]}>Loading...</Text>
        </View>
      )}

      {imageData && (
        <View style={styles.result}>
          <Image source={{ uri: getImageUrl(imageData.imageName, imageData.date) }} style={styles.image} />
          <Text style={[styles.caption, { color: theme.colors.text }]}>{imageData.caption}</Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    flex: 1,
  },
  buttons: {
    borderRadius: 8,
    padding: 15,
    width: 250,
    alignItems: 'center',
    marginVertical: 10,
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
  loading: {
    marginTop: 20,
  },
  result: {
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 12,
  },
  caption: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
})
