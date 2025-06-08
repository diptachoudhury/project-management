import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TaskState {
  tasks: any[]
  isLoading: boolean
  error: string | null
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setTasks: (state, action: PayloadAction<any[]>) => {
      state.tasks = action.payload
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    addTask: (state, action: PayloadAction<any>) => {
      state.tasks.push(action.payload)
    },
    updateTask: (state, action: PayloadAction<any>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },
    resetTasks: (state) => {
      state.tasks = []
      state.error = null
      state.isLoading = false
    },
  },
})

export const {
  setLoading: setTaskLoading,
  setTasks,
  setError: setTaskError,
  addTask,
  updateTask,
  resetTasks,
} = taskSlice.actions
export default taskSlice.reducer