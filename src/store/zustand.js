import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'


const token = localStorage.getItem("token")
const user = localStorage.getItem("user")
const userId = "start"
const IdNotification = "IdNotification"


export const useToken= create()(
  immer((set) => ({
    userId: userId,
    token: token,
    IdNotification: IdNotification,
    user: JSON.parse(user),
    setToken: (token) =>
      set((state) => {
          state.token = token
      }),
      setUser: (user) =>
      set((state) => {
          state.user = user
      }),
      setUserId: (userId) =>
      set((state) => {
          state.userId = userId
      }),
      setIdNotification: (IdNotification) =>
      set((state) => {
          state.IdNotification = IdNotification
      }),
  })),
)
