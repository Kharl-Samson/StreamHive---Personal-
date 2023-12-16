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
    });
    return response.data
  } catch (error : any) {
    throw new Error(error.response?.data)
  }
}
