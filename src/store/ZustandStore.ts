import { create } from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware"

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

type AnimeDetails = {
  animeId: string;
  watchedEpisode: number[]
}

type WebStateStore = {
  animeDetails: AnimeDetails[]
  setAnimeDetails: (value: AnimeDetails[]) => void
}

// Storing web states in client side
const useAnimeDataPersist = create<WebStateStore>()(
  persist(
    (set) => ({
      animeDetails: [],
      setAnimeDetails: (value: AnimeDetails[]) => set({ animeDetails: value })
    }),
    {
      name: "AnimeData",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

type AnimeDetailsList = {
  animeId: string
  animeName: string
  animeImage: string
  totalEpisodes: number
}

type MyListStateStore = {
  myListDetails: AnimeDetailsList[]
  setMyListDetails: (value: AnimeDetailsList[]) => void
}

const useMyListPersist = create<MyListStateStore>()(
  persist(
    (set) => ({
      myListDetails: [],
      setMyListDetails: (value: AnimeDetailsList[]) => set({ myListDetails: value })
    }),
    {
      name: "MyList",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export { useAppStore, useAnimeDataPersist, useMyListPersist }