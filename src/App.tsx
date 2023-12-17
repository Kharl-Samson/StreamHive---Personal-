import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/homePage/Home"
import { Trending } from "./pages/trendingPage/Trending"
import { Latest } from "./pages/latestPage/Latest"
import { Popular } from "./pages/popularPage/Popular"
import { SearchPage } from "./helpers/SearchPage"
import { Selected } from "./pages/SelectedPage/Selected"
import useAppStore from "./store/ZustandStore"

function App() {
    // Theme Toggle
    const {isCheckedTheme} = useAppStore()

  return (
    <div className={`custom-transition-duration ${isCheckedTheme ? 'bg-custom-dark-1' : 'bg-white'}`}>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home/>}/>
        <Route path="/Trending" element={<Trending/>}/>
        <Route path="/Latest" element={<Latest/>}/>
        <Route path="/Popular" element={<Popular/>}/>

        {/* Selected Data */}
        <Route path="/Anime/:dataId" element={<Selected/>}/>

        {/* Helpers */}
        <Route path="/Search" element={<SearchPage/>}/>
      </Routes>
    </div>
  )
}

export default App
