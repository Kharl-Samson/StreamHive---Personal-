import { useWebStatePersist } from "@/store/ZustandStore"

// Trigger when click the episode
export const saveData = (animeId: string, watchedEpisode: number) => {
    // Anime Storage Data
    const { animeDetails, setAnimeDetails } = useWebStatePersist.getState()
    let isUpdated = false
  
    const updatedData = animeDetails.map(item => {
      if (item.animeId === animeId) {
        isUpdated = true
        const updatedWatchedEpisodes = item.watchedEpisode.filter(ep => ep !== watchedEpisode)
        return {
          ...item,
          watchedEpisode: [...updatedWatchedEpisodes, watchedEpisode]
        }
      }
      return item
    })
  
    if (!isUpdated) {
      setAnimeDetails([
        ...animeDetails,
        {
          animeId: animeId,
          watchedEpisode: [watchedEpisode]
        }
      ])
    } else {
      setAnimeDetails(updatedData)
    }
  }