import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OrgState {
  currentOrg: any | null
  orgs: any[]
  isLoading: boolean
  error: string | null
}

const initialState: OrgState = {
  currentOrg: null,
  orgs: [],
  isLoading: false,
  error: null,
}

const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {
    setOrgLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setOrgs: (state, action: PayloadAction<any[]>) => {
      state.orgs = action.payload
      state.error = null
    },
    setCurrentOrg: (state, action: PayloadAction<any>) => {
      state.currentOrg = action.payload
      state.error = null
    },
    setOrgError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    addOrg: (state, action: PayloadAction<any>) => {
      state.orgs.push(action.payload)
    },
    resetOrg: (state) => {
      state.currentOrg = null
      state.orgs = []
      state.error = null
      state.isLoading = false
    },
  },
})

export const {
  setOrgLoading,
  setOrgs,
  setCurrentOrg,
  setOrgError,
  addOrg,
  resetOrg,
} = orgSlice.actions
export default orgSlice.reducer