import axios from 'axios'
import { API_KEY, NEOWS_CONFIG } from '../../core/api'

export const fetchNeo = async () => {
  try {
    const response = await axios.get(`${NEOWS_CONFIG.URL}?api_key=${API_KEY}`)

    const dates = Object.keys(response.data.near_earth_objects)
    const firstDate = dates[0]
    const objects = response.data.near_earth_objects[firstDate]

    return objects.slice(0, 10).map((obj: any, index: number) => ({
      id: obj.id,
      name: obj.name,
      diameterMin: obj.estimated_diameter.meters.estimated_diameter_min,
    }))
  } catch (error) {
    console.error('Error al obtener objetos NEO:', error)
    throw error
  }
}
