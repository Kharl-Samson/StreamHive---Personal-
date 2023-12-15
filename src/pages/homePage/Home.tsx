import { Navbar } from "../../components/Navbar/Navbar"
import { HeroSection } from "./components/HeroSection"

export const Home = () => {
  return (
    <>
        {/* Navbar */}
        <Navbar active = "Home"/>

        {/* Hero Section */}
        <HeroSection/>
    </>
  )
}
