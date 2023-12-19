import { ListContainer } from "../../components/AnimeList/ListContainer"
import { Footer } from "../../components/Footer/Footer"
import { Navbar } from "../../components/Navbar/Navbar"
import { useAppStore } from "../../store/ZustandStore"
import { HeroSection } from "./components/HeroSection"

export const Home = () => {
  // Theme Toggle
  const {isCheckedTheme} = useAppStore()

  return (
    <>
        {/* Navbar */}
        <Navbar active = "Home"/>

        {/* Hero Section */}
        <HeroSection/>

        {/* For Shadowing */}
        <div className="w-full h-20 absolute mt-[-2.5rem] left-0 custom-transition-duration"
          style={{backgroundImage: `linear-gradient(180deg, transparent, ${isCheckedTheme ? '#070c13, #070c13' : '#ffff, #ffff'})`}}
        >
        </div>

        {/* Trending Now Section */}
        <ListContainer 
          fetchCategory = "top-airing"
          type = "Trending"
          title = "Trending Now"
          description = "Explore and immerse yourself in the captivating world of the most current and trending anime series available!"
          spacing = "lg:top-[-12rem]"
          hasSeeAll
        />

        {/* Latest Section */}
        <ListContainer 
          fetchCategory = "recent-episodes"
          type = "Latest"
          title = "Latest Release"
          description = "Keep yourself informed and in the loop with the most recent releases!"
          spacing = "lg:top-[-8rem]"
          hasSeeAll
        />

        {/* Footer Section */}
        <Footer/>
    </>
  )
}
