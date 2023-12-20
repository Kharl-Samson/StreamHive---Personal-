import { useParams } from "react-router-dom"
import { Footer } from "../../components/Footer/Footer"
import { Navbar } from "../../components/Navbar/Navbar"
import { useQuery } from "react-query"
import { getAnime, getAnimeEpisode } from "@/services/apiFetchAnimeList"
import { useEffect, useState } from "react"

import { ListContainer } from "@/components/AnimeList/ListContainer"
import { EpisodesContainer } from "@/components/EpisodesList/EpisodesContainer"
import { HeroSection } from "./components/HeroSection"

export const Watch = () => {
    // Params ID
    const { dataId, episodeId} = useParams()
    const myDataId = dataId || ""
    const myEpisodeId = episodeId || ""

    // Getting Anime Data  
    const { data: animeData, isFetched: isAnimeDataFetch } = useQuery(
        ["animeDataKey", myDataId, myEpisodeId],
        () => getAnime(myDataId)
    )

    // Gettin Current Episode Stream URL
    const { data: episodeData, isFetched: isEpisodeFetch } = useQuery(
        ["episodeDataKey", myDataId, myEpisodeId],
        () => getAnimeEpisode(myEpisodeId)
    )
    
    // Getting Random Rating
    const ratingData : number[] = [
        9.9, 9.8, 9.7, 9.6, 9.5, 9.4, 9.3, 9.2, 9.1, 9.0, 
        8.9, 8.8, 8.7, 8.6, 8.5, 8.4, 8.3, 8.2, 8.1, 8.0,
        7.9, 7.8, 7.7, 7.6, 7.5, 7.4, 7.3, 7.2, 7.1, 7.0
    ]
    const [fakeRating, setFakeRating] = useState<number>()
    
    // Setting up fake rating once the page is loaded
    useEffect(() => {
        const randomNumber = Math.random() * ratingData.length
        setFakeRating(ratingData[Math.floor(randomNumber)])
    },[])
    
    // Setting timeout for skeleton
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        setIsLoading(true)
        if(isAnimeDataFetch && isEpisodeFetch){
          const timer = setTimeout(() => {
            setIsLoading(false)
          }, 500)
          return () => clearTimeout(timer)
        }
    },[isAnimeDataFetch, isEpisodeFetch, dataId])

    
  return (
    <>
        {/* Navbar */}
        <Navbar/>

        {/* Hero Section */}
        <HeroSection 
            animeData = {animeData} 
            episodeData = {episodeData}
            fakeRating = {fakeRating}
            isLoading = {isLoading}
            dataId = {dataId}
            myEpisodeId = {myEpisodeId}
        />


        {/* Episodes Container */
        animeData?.type !== "MOVIE" &&
          <EpisodesContainer
              animeData = {animeData} 
              isLoading = {isLoading}
          />
        }

        {/* Popular Now Section */}
        <ListContainer 
          fetchCategory = "recent-episodes"
          type = "Latest"
          title = "Latest Release"
          description = "Keep yourself informed and in the loop with the most recent releases!"
          spacing = "lg:pt-10 lg:pb-20"
          hasSeeAll
        />

        {/* Footer Section */}
        <Footer/>
    </>
  )
}
