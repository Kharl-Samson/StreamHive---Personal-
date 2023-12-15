import { create } from 'zustand'

type appStore = {
  isCheckedTheme: boolean
  setisCheckedTheme: (value: boolean) => void
}

const useAppStore = create<appStore>()(
  (set) => {
  return ({
    // Theme Toggle
    isCheckedTheme: true,
    setisCheckedTheme: (value: boolean) => set({ isCheckedTheme: value }),
  })
})

export default useAppStore