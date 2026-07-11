import apiClient from './client'

export function fetchTasks() {
  return apiClient.get('/tasks/')
}

export function createTask(taskData) {
  return apiClient.post('/tasks/', taskData)
}

export function updateTask(taskId, taskData) {
  return apiClient.patch(`/tasks/${taskId}/`, taskData)
}

export function deleteTask(taskId) {
  return apiClient.delete(`/tasks/${taskId}/`)
}
