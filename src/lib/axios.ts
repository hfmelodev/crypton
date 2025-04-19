import axios from 'axios'

export const API = axios.create({
  baseURL: 'https://rest.coincap.io/v3/assets',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_COINCAP_API_KEY}`,
  },
})
