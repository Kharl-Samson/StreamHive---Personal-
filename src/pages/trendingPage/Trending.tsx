import { ListContainer } from "../../components/AnimeList/ListContainer"
import { Footer } from "../../components/Footer/Footer"
import { Navbar } from "../../components/Navbar/Navbar"

export const Trending = () => {

  return (
    <>
        {/* Navbar */}
        <Navbar active = "Trending"/>

        {/* Trending Now Section */}
        <ListContainer 
          fetchCategory = "top-airing"
          type = "Trending"
          title = "Trending Now"
          description = "Explore and immerse yourself in the captivating world of the most current and trending anime series available!"
          spacing = "lg:pt-10 lg:pb-20"
        />

        {/* Footer Section */}
        <Footer/>
    </>
  )
}
