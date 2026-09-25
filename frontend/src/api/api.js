import axios from 'axios'

const api = axios.create({
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

export const loginUser = (payload) => api.post('/auth/login', payload)
export const logoutUser = () => api.get('/auth/logout')
export const getTasks = () => api.get('/task/get')
export const createTask = (payload) => api.post('/task/post', payload)
export const updateTask = (id, payload) => api.put(`/task/put/${id}`, payload)
export const deleteTask = (id) => api.delete(`/task/delete/${id}`)

export default api
