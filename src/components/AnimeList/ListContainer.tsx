import useAppStore from "../../store/ZustandStore"
import { useEffect, useMemo } from "react"
import { useQuery } from "react-query"
import { Item } from "../AnimeItem/Item"
import { getAnimeList } from "../../services/apiFetchAnimeList"

type ListContainerProps = {
  fetchCategory : string
  type : string
  title : string
  description : string
  hasMarginTop? : boolean
}

export const ListContainer = ({ fetchCategory, type, title, description, hasMarginTop } : ListContainerProps) => {
    // Theme Toggle
    const {isCheckedTheme} = useAppStore()

    // Getting Anime Data List 
    const { data: dataPage1, isError: isErrorPage1, isFetched: isFetchedPage1 } = useQuery(
      [type === "Trending" ? "animeDataTrending1" : type === "recent-episodes" ? "animeDataRecent1" : "noKey"],
      () => getAnimeList(fetchCategory)
    )
    const { data: dataPage2, isError: isErrorPage2, isFetched: isFetchedPage2 } = useQuery(
      [type === "Trending" ? "animeDataTrending2" : type === "recent-episodes" ? "animeDataRecent2" : "noKey"],
      () => getAnimeList(fetchCategory)
    )

    // Combining the results when both requests have been resolved
    const combinedData = useMemo(() => {
      if (isFetchedPage1 && isFetchedPage2) {
        return {
          results: (dataPage1?.results || []).concat(dataPage2?.results || []),
        }
      }
      return null
    }, [isFetchedPage1, isFetchedPage2, dataPage1, dataPage2])

    // Setting timeout for skeleton
    useEffect(() => {
        if(isFetchedPage1 && isFetchedPage2){
        //   const timer = setTimeout(() => {
        //     setIsLoading(false)
        //   }, 500)
        //   return () => clearTimeout(timer)
        }
    }, [isFetchedPage1, isFetchedPage2])
           
    useEffect(() =>{
        console.log(isErrorPage1, isErrorPage2, type)
    },[])

  return (
    <section className={`w-full custom-transition-duration ${isCheckedTheme ? 'bg-custom-dark-1' : 'bg-white'}`}>
        <div className={`max-w-[80%] sm:max-w-none w-10/12 mx-auto relative ${hasMarginTop && 'lg:top-[-12rem]'}`}>

            {/* Headers */}
            <h1 className="text-custom-gray-4 text-4xl font-semibold text-center lg:text-left pt-10 lg:pt-0">{title}</h1>

            <div className="flex flex-col lg:flex-row justify-between items-center border-b-2 border-custom-blue-1 pb-5 gap-x-10 mt-4 lg:mt-0">
                <p className="text-base text-custom-gray-1 text-center lg:text-left">{description}</p>

                <button className="text-custom-gray-1 border-custom-gray-1 mt-4 lg:mt-[-.50rem] whitespace-nowrap
                    border-2 px-5 py-2 rounded-full disable-highlight custom-transition-duration
                    hover:border-custom-blue-1 hover:text-custom-blue-1 active:scale-95"
                >
                    See All &#62;
                </button>
            </div>

            {/* Anime Container */}
            <div className="mt-10 grid gap-x-7 gap-y-10 grid-cols-1 sm:grid-cols-2 870size:grid-cols-3 1220size:grid-cols-5 1920size:grid-cols-6">
                {/* Why Master Solar Dealer Mapping */
                    combinedData?.results?.map((res: any) => (
                      <Item
                        key = {res?.id}
                        id = {res?.id}
                        title = {res?.title}
                        image = {res?.image}
                        genres = {res?.genres}
                      />
                    ))
                }
            </div>
        </div>
    </section>
  )
}
