import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
}

// Load auth from localStorage if available
const getInitialState = (): AuthState => {
  if (typeof window !== "undefined") {
    const savedAuth = localStorage.getItem("auth")
    if (savedAuth) {
      return JSON.parse(savedAuth)
    }
  }
  return { isAuthenticated: false, user: null }
}

const initialState: AuthState = getInitialState()

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true
      state.user = action.payload

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(state))
      }
    },
    register: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true
      state.user = action.payload

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(state))
      }
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(state))
      }
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(state))
      }
    },
  },
})

export const { login, register, logout, updateProfile } = authSlice.actions

export default authSlice.reducer

