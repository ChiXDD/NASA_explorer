import axios from 'axios'
import { API_KEY } from '../../core/api'

export const fetchMarsPhotos = async (earthDate: string, page: number = 1) => {
  try {
    const response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos', {
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
