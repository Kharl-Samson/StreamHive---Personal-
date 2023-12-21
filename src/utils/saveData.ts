import { useAnimeDataPersist, useMyListPersist } from "@/store/ZustandStore"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Trigger when click the episode
export const saveData = (animeId: string, watchedEpisode: number) => {
    // Anime Storage Data
    const { animeDetails, setAnimeDetails } = useAnimeDataPersist.getState()
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

// Add to MyList
export const addToList = (animeId: string, animeName: string, animeImage: string, totalEpisodes : number) => {
    // My list Storage Data
    const { myListDetails, setMyListDetails } = useMyListPersist.getState()
    let isUpdated = false

    const updatedData = myListDetails.map(item => {
      if (item.animeId === animeId) {
        isUpdated = true
        return {
          ...item,
          totalEpisodes: totalEpisodes
        }
      }
      return item
    })

    if (!isUpdated) {
      setMyListDetails([
        ...myListDetails,
        {
          animeId: animeId,
          animeName: animeName,
          animeImage : animeImage,
          totalEpisodes: totalEpisodes
        }
      ])
      toast.success("Added to the list succesfully")
    } else {
      setMyListDetails(updatedData)
      toast.info("This anime is already in your list")
    }
}

// Remove from My List
export const removeFromList = (animeIdToRemove: string) => {
  // My list Storage Data
  const { myListDetails, setMyListDetails } = useMyListPersist.getState()

  const updatedList = myListDetails.filter(item => item.animeId !== animeIdToRemove)

  if (updatedList.length !== myListDetails.length) {
    setMyListDetails(updatedList)
    toast.success("Anime removed from the list successfully")
  } else {
    toast.error("Anime not found in your list")
  }
}