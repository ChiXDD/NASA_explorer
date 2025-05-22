import axios from 'axios'
import { API_KEY, NEOWS_CONFIG } from '../../core/api'

export const fetchNeo = async (page: number = 0) => {
  try {
    const response = await axios.get(`${NEOWS_CONFIG.URL}?api_key=${API_KEY}`)

    const neoData = response.data.near_earth_objects
    const allObjects = Object.keys(neoData).flatMap((date) =>
      neoData[date].map((obj: any) => ({
        id: obj.id,
        name: obj.name,
        diameterMin: obj.estimated_diameter.meters.estimated_diameter_min,
      }))
    )

    return allObjects
  } catch (error) {
    console.error('Error al obtener objetos NEO:', error)
    throw error
  }
}
