import axios from 'axios'
import { LIBRARY_CONFIG } from '../../core/api'

export const fetchLibrary = async (keyword: string) => {
  try {
    const response = await axios.get(`${LIBRARY_CONFIG.URL}${encodeURIComponent(keyword)}`)
    return response.data.collection.items
  } catch (error) {
    console.error('Error fetching NASA media:', error)
    throw error
  }
}
