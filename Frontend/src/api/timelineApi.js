import api from './axios'

export const getTimeline = async () => {
  const response = await api.get('/timeline')
  return response.data
}

export const getIntegrityStatus = async (evidenceId) => {
  const response = await api.get(`/integrity${evidenceId ? `?evidence_id=${evidenceId}` : ''}`)
  return response.data
}
