import { MyListContainer } from "@/components/AnimeList/MyListContainer"
import { Footer } from "../../components/Footer/Footer"
import { Navbar } from "../../components/Navbar/Navbar"

export const MyList = () => {

  return (
    <>
        {/* Navbar */}
        <Navbar active = "My List"/>

        {/* Trending Now Section */}
        <MyListContainer 
          title = "My List"
          description = "Check out the collection of an anime you've added!"
          spacing = "lg:pt-10 lg:pb-20"
        />

        {/* Footer Section */}
        <Footer/>
    </>
  )
}
