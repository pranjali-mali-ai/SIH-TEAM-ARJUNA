import api from './axios'

export const generateReport = async (payload = {}) => {
  const response = await api.post('/report/generate', payload)
  return response.data
}
