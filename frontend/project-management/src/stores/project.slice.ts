import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProjectState {
  currentProject: any | null
  projects: any[]
  isLoading: boolean
  error: string | null
}

const initialState: ProjectState = {
  currentProject: null,
  projects: [],
  isLoading: false,
  error: null,
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setProjects: (state, action: PayloadAction<any[]>) => {
      state.projects = action.payload
      state.error = null
    },
    setCurrentProject: (state, action: PayloadAction<any>) => {
      state.currentProject = action.payload
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    addProject: (state, action: PayloadAction<any>) => {
      state.projects.push(action.payload)
    },
    resetProject: (state) => {
      state.currentProject = null
      state.projects = []
      state.error = null
      state.isLoading = false
    },
  },
})

export const {
  setLoading: setProjectLoading,
  setProjects,
  setCurrentProject,
  setError: setProjectError,
  addProject,
  resetProject,
} = projectSlice.actions
export default projectSlice.reducer