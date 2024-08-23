export type City = string

export interface Weather {
  country: string
  icon: string
  temp_c: number
  text: string
}

export interface CitysSecondary extends Weather{
  id: number
  city: string
}

export const defaultWeather: Weather = {
  country: 'Pais',
  icon: '/imgs/icon.png',
  temp_c: 0,
  text: 'Clima'
}

export type ComponentsCity = 'AddCard' | 'CardClima'


