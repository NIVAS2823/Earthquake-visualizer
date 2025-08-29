// Magnitude scale information and descriptions

export interface MagnitudeScale {
  min: number
  max: number
  label: string
  description: string
  effects: string
  frequency: string
}

export const MAGNITUDE_SCALES: MagnitudeScale[] = [
  {
    min: 8.0,
    max: 10,
    label: '8.0+',
    description: 'Great',
    effects: 'Severe damage, felt worldwide',
    frequency: 'Once per year'
  },
  {
    min: 7.0,
    max: 7.9,
    label: '7.0-7.9',
    description: 'Major',
    effects: 'Serious damage over large areas',
    frequency: '10-15 per year'
  },
  {
    min: 6.0,
    max: 6.9,
    label: '6.0-6.9',
    description: 'Strong',
    effects: 'Damage to buildings and structures',
    frequency: '100-150 per year'
  },
  {
    min: 5.0,
    max: 5.9,
    label: '5.0-5.9',
    description: 'Moderate',
    effects: 'Felt widely, minor damage',
    frequency: '1,000-1,500 per year'
  },
  {
    min: 4.0,
    max: 4.9,
    label: '4.0-4.9',
    description: 'Light',
    effects: 'Felt by many, no damage',
    frequency: '10,000-15,000 per year'
  },
  {
    min: 3.0,
    max: 3.9,
    label: '3.0-3.9',
    description: 'Minor',
    effects: 'Felt by some people',
    frequency: '100,000+ per year'
  },
  {
    min: 0,
    max: 2.9,
    label: '0.0-2.9',
    description: 'Micro',
    effects: 'Usually not felt',
    frequency: 'Millions per year'
  }
]

export const getMagnitudeScaleInfo = (magnitude: number): MagnitudeScale => {
  return MAGNITUDE_SCALES.find(scale => 
    magnitude >= scale.min && magnitude <= scale.max
  ) || MAGNITUDE_SCALES[MAGNITUDE_SCALES.length - 1]
}