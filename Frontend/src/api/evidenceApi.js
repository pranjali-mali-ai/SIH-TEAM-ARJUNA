import api from './axios'

export const uploadEvidence = async (payload) => {
  const response = await api.post('/evidence/upload', payload)
  return response.data
}

export const getEvidence = async () => {
  const response = await api.get('/evidence')
  return response.data
}

export const getEvidenceDetails = async (evidenceId) => {
  const response = await api.get(`/evidence/${evidenceId}`)
  return response.data
}
