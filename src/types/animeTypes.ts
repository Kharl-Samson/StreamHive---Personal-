// Types for episode in animeData
type Episode = {
    id: string
    number: number
    url: string
}

// Types for Anime Data
export type animeDataType = {
    id: string
    title: string
    url: string
    genres: string[]
    totalEpisodes: number
    image: string
    releaseDate: string
    description: string
    subOrDub: string
    type: string
    status: string
    otherName: string
    episodes: Episode[]
}

// Types for Episode Data
export type episodeDataType = {
    name: string
    url: string
}[]
