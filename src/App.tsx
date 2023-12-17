import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/homePage/Home"
import { Trending } from "./pages/trendingPage/Trending"
import { Latest } from "./pages/latestPage/Latest"
import { Popular } from "./pages/popularPage/Popular"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Trending" element={<Trending/>}/>
        <Route path="/Latest" element={<Latest/>}/>
        <Route path="/Popular" element={<Popular/>}/>
      </Routes>
    </>
  )
}

export default App
