import { useState, ChangeEvent, FormEvent } from "react"
import { ListContainer } from "../components/AnimeList/ListContainer"
import { Footer } from "../components/Footer/Footer"
import { Navbar } from "../components/Navbar/Navbar"
import { useAppStore } from "../store/ZustandStore"
import { useNavigate } from "react-router-dom"

export const SearchPage = () => {
    // Theme Toggle
    const {isCheckedTheme} = useAppStore()
    // Page Navigator
    const navigate = useNavigate()

    // Search Controller
    const [hasSearch, setHasSearch] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)
    const [animeName, setAnimeName] = useState<string>('')
    const searchAnime = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setAnimeName(inputValue)
        setHasSearch(true)
    }
    
  return (
    <>
        {/* Navbar */}
        <Navbar/>

        {/* Search Container */}
        <div className={`py-20 w-full custom-transition-duration ${isCheckedTheme ? 'bg-custom-dark-1' : 'bg-white'}`}>
            <div className="max-w-[80%] sm:max-w-none w-10/12 mx-auto">

                {/* Search Input */}
                <div className="p-y-5">
                    <div className="mx-auto rounded-lg bg-gray-200 p-5 w-full max-w-[40rem]">
                        <form onSubmit={searchAnime}>
                            <div className="flex">
                                <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                                  <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition">
                                    <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                                  </svg>
                                </div>
                                <input 
                                    autoFocus
                                    type="text" 
                                    className="w-full bg-white pl-2 text-base outline-0"
                                    value={inputValue}
                                    onChange={(handleInputChange)}
                                />
                                <input 
                                    type="submit" 
                                    value="Search" 
                                    className="bg-custom-blue-1 py-2 px-4 rounded-tr-lg rounded-br-lg text-white sm:hover:bg-blue-800 transition-colors cursor-pointer"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="mt-3 mx-auto w-full max-w-[40rem] flex gap-3 justify-end">
                        {/* Go back to page */}
                        <button 
                          className={`text-white bg-custom-dark-2 px-5 py-2 rounded-md 
                                disable-highlight custom-transition-duration sm:hover:bg-custom-blue-1 
                                active:scale-95 whitespace-nowrap`}
                                onClick={() => navigate(-1)}
                        >
                            &#8592; Go Back
                        </button>
                        {/* Reset search */}
                        <button 
                          className={`text-white bg-custom-dark-2 px-5 py-2 rounded-md 
                                disable-highlight custom-transition-duration sm:hover:bg-custom-blue-1 
                                active:scale-95 whitespace-nowrap`}
                                onClick={() => { setInputValue(''); setHasSearch(false)}}
                        >
                            Reset
                        </button>
                    </div>
                </div>

            </div>
        </div>
    
        {!hasSearch ? 
            // Trending Now Section
            <ListContainer 
              fetchCategory = "top-airing"
              type = "Trending"
              title = "Top Searches"
              description = "Here are the list of most frequently searched anime series, reflecting widespread interest across platforms worldwide"
              spacing = "lg:pt-10 lg:pb-20"
            />
            :
            // Seach Results Section
            <ListContainer 
              fetchCategory = {animeName}
              type = "Search"
              title = "Results:"
              description = {`Explore anime related to the word : ${animeName}`}
              spacing = "lg:pt-10 lg:pb-20"
            />
        }

        {/* Footer Section */}
        <Footer/>
    </>
  )
}
