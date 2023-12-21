// Types for my Item Container
export type ItemType = {
    id: string
    title: string
    image: string
    genres: string[]
    episodeNumber: number
    releaseDate: string
}

// Types for my ItemList Container
export type ItemListType = {
    animeId: string 
    animeName: string
    animeImage: string
    totalEpisodes: number
}