



//Not updated yet




import api from '@/lib/axios'
import { store } from '@/stores/store'
import {
  setOrgLoading,
  setOrgs,
  setCurrentOrg,
  setOrgError,
  addOrg,
} from '@/stores/org.slice'

export const orgs = {
  create: async (payload: { name: string }) => {
    try {
      store.dispatch(setOrgLoading(true))
      const { data } = await api.post('/orgs', payload)
      store.dispatch(addOrg(data.organization))
      return data
    } catch (error: any) {
      store.dispatch(setOrgError(error.response?.data?.message || 'Organization creation failed'))
      throw error
    } finally {
      store.dispatch(setOrgLoading(false))
    }
  },

  inviteMember: async (orgId: string, payload: { email: string; role: string }) => {
    try {
      store.dispatch(setOrgLoading(true))
      const { data } = await api.post(`/orgs/${orgId}/invite`, payload)
      return data
    } catch (error: any) {
      store.dispatch(setOrgError(error.response?.data?.message || 'Invitation failed'))
      throw error
    } finally {
      store.dispatch(setOrgLoading(false))
    }
  },

  getOrganizations: async () => {
    try {
      store.dispatch(setOrgLoading(true))
      const { data } = await api.get('/orgs')
      store.dispatch(setOrgs(data.organizations))
      return data
    } catch (error: any) {
      store.dispatch(setOrgError(error.response?.data?.message || 'Failed to fetch organizations'))
      throw error
    } finally {
      store.dispatch(setOrgLoading(false))
    }
  },

  acceptInvitation: async (token: string) => {
    try {
      store.dispatch(setOrgLoading(true))
      const { data } = await api.post('/orgs/invite/accept', { token })
      store.dispatch(addOrg(data.organization))
      return data
    } catch (error: any) {
      store.dispatch(setOrgError(error.response?.data?.message || 'Invitation acceptance failed'))
      throw error
    } finally {
      store.dispatch(setOrgLoading(false))
    }
  },
}