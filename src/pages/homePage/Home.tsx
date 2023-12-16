import { ListContainer } from "../../components/AnimeList/ListContainer"
import { Navbar } from "../../components/Navbar/Navbar"
import { HeroSection } from "./components/HeroSection"

export const Home = () => {
  return (
    <>
        {/* Navbar */}
        <Navbar active = "Home"/>

        {/* Hero Section */}
        <HeroSection/>

        {/* Trending Now Section */}
        <ListContainer 
          fetchCategory = "top-airing"
          type = "Trending"
          title = "Trending Now"
          description = "Explore and immerse yourself in the captivating world of the most current and trending anime series available!"
          hasMarginTop
        />

        {/* Popular Section */}
        <ListContainer 
          fetchCategory = "recent-episodes"
          type = "Latest"
          title = "Latest Release"
          description = "Keep yourself informed and in the loop with the most recent releases!"
          hasMarginTop = {false}
        />
    </>
  )
}
