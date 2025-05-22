import type { HomeStackParamList } from '../navigation/types'

export const ROUTES: { [K in keyof HomeStackParamList]: K } = {
  Home: 'Home',
  APOD: 'APOD',
  NeoWs: 'NeoWs',
  EPIC: 'EPIC',
  Rover: 'Rover',
  Library: 'Library',
}
