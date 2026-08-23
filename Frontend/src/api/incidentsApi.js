import api from './axios'

export const getIncidents = async () => {
  const response = await api.get('/incidents')
  return response.data
}

export const getIncidentDetails = async (incidentId) => {
  const response = await api.get(`/incidents/${incidentId}`)
  return response.data
}
