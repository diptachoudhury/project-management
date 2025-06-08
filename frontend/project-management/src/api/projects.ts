import api from '@/lib/axios'
import { store } from '@/stores/store'
import {  setProjectLoading } from '@/stores/project.slice'

export const projects = {
  create: async (orgId: string, payload: { name: string }) => {
    try {
      store.dispatch(setProjectLoading(true))
      const { data } = await api.post(`/projects/org/${orgId}`, payload)
      return data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Project creation failed')
    } finally {
      store.dispatch(setProjectLoading(false))
    }
  },

  getByOrg: async (orgId: string) => {
    try {
      store.dispatch(setProjectLoading(true))
      const { data } = await api.get(`/projects/org/${orgId}`)
      return data.projects
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch projects')
    } finally {
      store.dispatch(setProjectLoading(false))
    }
  },

  getDetails: async (projectId: string) => {
    try {
      store.dispatch(setProjectLoading(true))
      const { data } = await api.get(`/projects/${projectId}`)
      return data.project
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch project details')
    } finally {
      store.dispatch(setProjectLoading(false))
    }
  },
}