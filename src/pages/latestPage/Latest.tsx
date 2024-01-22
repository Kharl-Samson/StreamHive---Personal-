import { ListContainer } from "../../components/AnimeList/ListContainer"
import { Footer } from "../../components/Footer/Footer"
import { Navbar } from "../../components/Navbar/Navbar"

export const Latest = () => {

  return (
    <>
      {/* Navbar */}
      <Navbar active = "Latest"/>

      {/* Trending Now Section */}
      <ListContainer 
        fetchCategory = "recent-episodes"
        type = "Latest"
        title = "Latest Release"
        description = "Keep yourself informed and in the loop with the most recent releases!"
        spacing = "lg:pt-10 lg:pb-20"
      />

      {/* Footer Section */}
      <Footer/>
    </>
  )
}
