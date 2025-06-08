import api from '@/lib/axios'
import { store } from '@/stores/store'
import { setTaskLoading } from '@/stores/task.slice';

export const tasks = {
  create: async (projectId: string, payload: { title: string; description: string; priority: string }) => {
    try {
      store.dispatch(setTaskLoading(true))
      const { data } = await api.post(`/projects/${projectId}/tasks`, payload)
      return data.task
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Task creation failed')
    } finally {
      store.dispatch(setTaskLoading(false))
    }
  },

  getByProject: async (projectId: string) => {
    try {
      store.dispatch(setTaskLoading(true))
      const { data } = await api.get(`/projects/${projectId}/tasks`)
      return data.tasks
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tasks')
    } finally {
      store.dispatch(setTaskLoading(false))
    }
  },

  updateStatus: async (taskId: string, status: string) => {
    try {
      store.dispatch(setTaskLoading(true))
      const { data } = await api.patch(`/tasks/${taskId}/status`, { status })
      return data.task
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update task status')
    } finally {
      store.dispatch(setTaskLoading(false))
    }
  },

  assignTask: async (taskId: string, assigneeId: string) => {
    try {
      store.dispatch(setTaskLoading(true))
      const { data } = await api.patch(`/tasks/${taskId}/assign`, { assigneeId })
      return data.task
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to assign task')
    } finally {
      store.dispatch(setTaskLoading(false))
    }
  },
}