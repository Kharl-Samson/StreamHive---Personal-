import { useNavigate, useParams } from "react-router-dom"
import { Footer } from "../../components/Footer/Footer"
import { Navbar } from "../../components/Navbar/Navbar"
import { HeroSection } from "./components/HeroSection"
import { useQuery } from "react-query"
import { getAnime } from "@/services/apiFetchAnimeList"
import { useEffect, useState } from "react"
import { EpisodesContainer } from "../../components/EpisodesList/EpisodesContainer"
import { ListContainer } from "@/components/AnimeList/ListContainer"
import { toast } from "react-toastify"

export const Selected = () => {
    // Params ID
    const { dataId } = useParams()
    const id = dataId || ""

    // Page Navigator
    const navigate = useNavigate()
    
    // Getting Anime Data  
    const { data: animeData, isFetched: isAnimeDataFetch, isError: isAnimeDataError } = useQuery(
      ["animeDataKey", id],
      () => getAnime(id)
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
      if(isAnimeDataFetch && !isAnimeDataError){
        const timer = setTimeout(() => {
          setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
      }
      else if(isAnimeDataError){
        toast.error("The request is invalid. Please try again!")
        navigate("/")
      }
    },[isAnimeDataFetch, isAnimeDataError, dataId])
    
  return (
    <>
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <HeroSection 
        animeData = {animeData} 
        fakeRating = {fakeRating}
        isLoading = {isLoading}
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
        fetchCategory = "popular"
        type = "Popular"
        title = "Popular Now"
        description = "Stay updated and connected with the latest trends by immersing in the most popular shows available!"
        spacing = "lg:pt-10 lg:pb-20"
        hasSeeAll
      />

      {/* Footer Section */}
      <Footer/>
    </>
  )
}
