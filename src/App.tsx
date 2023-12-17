import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/homePage/Home"
import { Trending } from "./pages/trendingPage/Trending"
import { Latest } from "./pages/latestPage/Latest"
import { Popular } from "./pages/popularPage/Popular"
import { SearchPage } from "./helpers/SearchPage"

function App() {
  return (
    <>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home/>}/>
        <Route path="/Trending" element={<Trending/>}/>
        <Route path="/Latest" element={<Latest/>}/>
        <Route path="/Popular" element={<Popular/>}/>

        {/* Helpers */}
        <Route path="/Search" element={<SearchPage/>}/>
      </Routes>
    </>
  )
}

export default App
