export type EducationCost = {
  Country: string
  City: string
  University: string
  Program: string
  Level: string
  Duration_Years: string
  Tuition_USD: string
  Living_Cost_Index: string
  Rent_USD: string
  Visa_Fee_USD: string
  Insurance_USD: string
  Exchange_Rate: string
}

export const eduColumns: (keyof EducationCost)[] = [
  'Country',
  'City',
  'University',
  'Program',
  'Level',
  'Duration_Years',
  'Tuition_USD',
  'Living_Cost_Index',
  'Rent_USD',
  'Visa_Fee_USD',
  'Insurance_USD',
  'Exchange_Rate',
]

export const costColumns: Set<(keyof EducationCost)> = new Set([
  'Tuition_USD',
  'Rent_USD',
  'Visa_Fee_USD',
  'Insurance_USD',
])