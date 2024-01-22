import { ListContainer } from "../../components/AnimeList/ListContainer"
import { Footer } from "../../components/Footer/Footer"
import { Navbar } from "../../components/Navbar/Navbar"

export const Popular = () => {

  return (
    <>
      {/* Navbar */}
      <Navbar active = "Popular"/>

      {/* Popular Now Section */}
      <ListContainer 
        fetchCategory = "popular"
        type = "Popular"
        title = "Popular Now"
        description = "Stay updated and connected with the latest trends by immersing in the most popular shows available!"
        spacing = "lg:pt-10 lg:pb-20"
      />

      {/* Footer Section */}
      <Footer/>
    </>
  )
}
