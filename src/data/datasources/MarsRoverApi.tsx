import axios from 'axios'
import { API_KEY, ROVER_CONFIG } from '../../core/api'

export const fetchMarsPhotos = async (earthDate: string, page: number = 1) => {
  try {
    const response = await axios.get(`${ROVER_CONFIG.URL}`, {
      params: {
        earth_date: earthDate,
        page,
        api_key: API_KEY,
      },
    })
    return response.data.photos
  } catch (error) {
    console.error('Error fetching Mars photos:', error)
    return []
  }
}
