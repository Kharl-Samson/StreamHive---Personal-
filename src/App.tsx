import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/homePage/Home"
import { Trending } from "./pages/trendingPage/Trending"
import { Latest } from "./pages/latestPage/Latest"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Trending" element={<Trending/>}/>
        <Route path="/Latest" element={<Latest/>}/>
      </Routes>
    </>
  )
}

export default App
