import axios from 'axios'

const API_KEY = import.meta.env.VITE_USDA_API_KEY

export const getFoodList = async () => {
  try {
    const response = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/foods/list?dataType=Survey%20%28FNDDS%29&api_key=${API_KEY}`
    )
    return response.data
  } catch (error) {
    console.error('Error')
  }
}

export const getFoodDetails = async (fdcId: string) => {
  try {
    const response = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?nutrients=203&nutrients=204&nutrients=205&nutrients=208&api_key=${API_KEY}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching food details:', error)
  }
}

export const searchFood = async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&dataType=Survey%20%28FNDDS%29&sortBy=dataType.keyword&sortOrder=asc&api_key=${API_KEY}`
    )
    return response.data
  } catch (error) {
    console.error('Error')
  }
}
