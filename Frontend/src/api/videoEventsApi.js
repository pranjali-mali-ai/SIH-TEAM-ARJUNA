import api from './axios'

export const getVideoEvents = async (evidenceId) => {
  const response = await api.get(`/video-events${evidenceId ? `?evidence_id=${evidenceId}` : ''}`)
  return response.data
}
