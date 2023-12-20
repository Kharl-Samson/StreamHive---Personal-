import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/homePage/Home"
import { Trending } from "./pages/trendingPage/Trending"
import { Latest } from "./pages/latestPage/Latest"
import { Popular } from "./pages/popularPage/Popular"
import { SearchPage } from "./helpers/SearchPage"
import { Selected } from "./pages/SelectedPage/Selected"
import { useAppStore } from "./store/ZustandStore"
import { Watch } from "./pages/watchPage/Watch"
import { ScrollToTop } from "./helpers/ScrollToTop"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { MyList } from "./pages/myListPage/MyList"

function App() {
    // Theme Toggle
    const {isCheckedTheme} = useAppStore()

  return (
    <div className={`custom-transition-duration ${isCheckedTheme ? 'bg-custom-dark-1' : 'bg-white'}`}>
      <ScrollToTop/>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home/>}/>
        <Route path="/Trending" element={<Trending/>}/>
        <Route path="/Latest" element={<Latest/>}/>
        <Route path="/Popular" element={<Popular/>}/>
        <Route path="/MyList" element={<MyList/>}/>

        {/* Selected Data */}
        <Route path="/Anime/:dataId" element={<Selected/>}/>

        {/* Watch Data */}
        <Route path="/Watch/:dataId/:episodeId" element={<Watch/>}/>

        {/* Helpers */}
        <Route path="/Search" element={<SearchPage/>}/>
      </Routes>

      {/* Toast Container */}
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme='colored'
      />
    </div>
  )
}

export default App
