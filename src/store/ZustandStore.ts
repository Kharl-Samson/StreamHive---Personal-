import { create } from 'zustand'

type appStore = {
  isCheckedTheme: boolean
  setisCheckedTheme: (value: boolean) => void
  fetchCategory: string
  setFetchCategory: (value: string) => void
}

const useAppStore = create<appStore>()(
  (set) => {
  return ({
    // Theme Toggle
    isCheckedTheme: true,
    setisCheckedTheme: (value: boolean) => set({ isCheckedTheme: value }),
    // Fetch Category
    fetchCategory: '',
    setFetchCategory: (value: string) => set({ fetchCategory: value }),
    
  })
})

export default useAppStore