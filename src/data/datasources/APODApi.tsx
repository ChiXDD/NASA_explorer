import axios from 'axios'
import { API_KEY, APOD_CONFIG } from '../../core/api'

export const fetchAPOD = async () => {
  try {
    const response = await axios.get(`${APOD_CONFIG.URL}?api_key=${API_KEY}`)
    return response.data
  } catch (error) {
    console.error('Error getting picture of the day:', error)
    throw error
  }
}
