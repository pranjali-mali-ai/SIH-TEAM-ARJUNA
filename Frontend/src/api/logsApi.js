import api from './axios'

export const uploadLogs = async (payload) => {
  const response = await api.post('/logs/upload', payload)
  return response.data
}

export const getNormalizedLogs = async () => {
  const response = await api.get('/logs/normalized')
  return response.data
}
