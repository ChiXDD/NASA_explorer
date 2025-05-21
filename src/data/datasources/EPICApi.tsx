// EPICApi.tsx
import axios from 'axios'
import { API_KEY, EPIC_CONFIG } from '../../core/api'

export const fetchEPIC = async (date: string) => {
  try {
    const response = await axios.get(`${EPIC_CONFIG.URL}/${date}?api_key=${API_KEY}`)

    const data = response.data

    if (data.length === 0) {
      return null
    }

    const imageData = data[0]

    return {
      caption: imageData.caption,
      date: imageData.date,
      imageName: imageData.image,
    }
  } catch (error) {
    console.error('Error getting the image from EPIC', error)
    throw error
  }
}
