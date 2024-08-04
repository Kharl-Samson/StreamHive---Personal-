import axios from "axios"

export const getAnimeList = async (category : string, page?: number) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/anime/gogoanime/${category}`, {
      params: {
        page: page,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error : unknown | string) {
    if (typeof error === 'string') {
      throw new Error(error)
    } else if (error instanceof Error) {
      throw error
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
}

export const getAnime = async (id : string) => {
  try { 
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/anime/gogoanime/info/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error : unknown | string) {
    if (typeof error === 'string') {
      throw new Error(error)
    } else if (error instanceof Error) {
      throw error
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
}

export const getAnimeEpisode = async (episodeId : string) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/anime/gogoanime/servers/${episodeId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error : unknown | string) {
    if (typeof error === 'string') {
      throw new Error(error)
    } else if (error instanceof Error) {
      throw error
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
}
