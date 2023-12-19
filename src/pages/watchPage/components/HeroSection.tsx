import { useEffect, useRef, useState } from "react"
import { useAppStore } from "../../../store/ZustandStore"
import { useNavigate } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { Player } from "@/components/VideoPlayer/Player"

type HeroSectionProps = {
    animeData : any
    episodeData : any
    fakeRating : number | undefined
    isLoading : boolean
}

export const HeroSection = ( { animeData, episodeData, fakeRating, isLoading } : HeroSectionProps) => {
    // Theme Toggle
    const {isCheckedTheme} = useAppStore()

    // Page Navigator
    const navigate = useNavigate()

    // Description trimmer
    const [showFullDescription, setShowFullDescription] = useState<boolean>(false)
    const [showSeeLess, setShowSeeLess] = useState<boolean>(false)
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription)
        setShowSeeLess(!showSeeLess)
    }

    const maxLength = 420;
    const shouldTrim = animeData?.description?.length  && animeData?.description?.length > maxLength && !showFullDescription
    const displayedText = shouldTrim ? `${animeData?.description?.slice(0, maxLength)}.....` : animeData?.description

    // Iframe Ref
    const iframeRef = useRef<any>(null)

    // Player Controller
    const [frameUrl, setFrameUrl] = useState<string>("")
    const [urlValue, setUrlValue] = useState<string>("")
    useEffect(() => {
        if(urlValue === "" && episodeData){
            setFrameUrl(episodeData[0]?.url)
        }
        else{
            setFrameUrl(urlValue)
        }
    },[episodeData, urlValue, isLoading])

    // Loading Skeleton
    const [loader, setLoader] = useState<boolean>(true)
    useEffect(() => {
        if(isLoading || loader){
            const timer = setTimeout(() => {
                setLoader(false)
            }, 500)
            return () => clearTimeout(timer)
        }
    },[loader, isLoading])

    const handleFullscreen = () => {
        if (iframeRef.current) {
          const iframe = iframeRef.current
    
          if (iframe.requestFullscreen) {
            iframe.requestFullscreen()
          } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen()
          } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen()
          } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen()
          }
        }
    }

  return (
    <div 
        className="pb-[8rem] pt-[5rem] rounded-b-[5rem] custom-gradient-bg-dark" 
        style={{
            background: `radial-gradient(40.56% 36.62% at 63.93% 48.85%, 
              rgba(149, 149, 149, 0.00) 0%, rgba(0, 0, 0, 0.20) 100%), 
              linear-gradient(0deg, ${isCheckedTheme ? 'rgba(7, 13, 17, 0.95)' : 'rgba(255, 255, 255, 0.90)'} 0%, 
              ${isCheckedTheme ? 'rgba(7, 13, 17, 0.95)' : 'rgba(255, 255, 255, 0.90)'} 100%), 
              url(${animeData?.image}) no-repeat lightgray 70% / cover`
        }}
    >

        <div className="mb-10 max-w-[80%] sm:max-w-none w-10/12 mx-auto">
            <p 
                className={`text-lg float-left mb-4 cursor-pointer ${isCheckedTheme ? 'text-white' : 'text-custom-dark-1'}
                hover:underline hover:text-custom-blue-1 disable-highlight active:scale-95 custom-transition-duration`}
                onClick={() => navigate(-1)}
            >
                &#8592; Go Back
            </p>

            <div className="flex flex-wrap sm:justify-between gap-3 w-[100%] xl:max-w-[45rem] clear-both">
                {/* Allow Fulls Screen */}
                <button 
                    onClick={handleFullscreen}
                    className={`text-white bg-custom-dark-2 px-5 py-2 rounded-md 
                        disable-highlight custom-transition-duration hover:bg-custom-dark-1 
                        active:scale-95 whitespace-nowrap`}
                    // onClick={prevPage}
                >
                  Allow Fullscreen
                </button>
                
                <div className="flex flex-wrap sm:justify-end gap-3">
                    {/* Prev Button */}
                    <button 
                        className={`text-white bg-custom-blue-1 px-5 py-2 rounded-md 
                            disable-highlight custom-transition-duration hover:bg-custom-dark-2 
                            active:scale-95 whitespace-nowrap`}
                        // onClick={prevPage}
                    >
                      &#8592; Prev Episode
                    </button>
                    {/* Next Button */}
                    <button 
                      className={`text-white bg-custom-blue-1 px-5 py-2 rounded-md 
                          disable-highlight custom-transition-duration hover:bg-custom-dark-2 
                          active:scale-95 whitespace-nowrap`}
                        // onClick={nextPage}
                    >
                      Next Episode &#8594;
                    </button>
                </div>
            </div>
        </div>
        
        <div className="max-w-[80%] sm:max-w-none w-10/12 mx-auto xl:flex gap-x-20">
            {isLoading || loader ? 
                <Skeleton className="w-[100%] xl:max-w-[45rem]
                            h-auto min-h-[16.5rem] 580size:min-h-[17rem]
                            600size:min-h-[21rem] 700size:min-h-[24rem] 800size:min-h-[27rem]
                            900size:min-h-[30rem] 1000size:min-h-[32rem] 1100size:min-h-[36rem] 
                            1220size:min-h-[38rem] xl:min-h-0
                            mx-auto xl:mx-0 object-cover rounded-3xl"/>
                :
                episodeData &&<Player dataUrl = {frameUrl} iframeRef = {iframeRef}/>
            }

            {isLoading ?
                <div className="w-full">
                    <Skeleton className="mb-10 mt-10 xl:mt-4 rounded-3xl custom-transition-duration w-full h-[2rem]"/>
                    {Array.from({ length: 10 }, (_, index) => (
                            <Skeleton key={index} className="mt-4 rounded-3xl custom-transition-duration w-full h-[1rem]"/>
                        ))
                    }
                </div>
                :
                <div className="mt-0 xl:mt-4">
                    {/* Title */}
                    <p className={`text-2xl sm:text-3xl md:text-4xl mt-10 xl:mt-0 custom-font-rocksalt custom-transition-duration
                        ${isCheckedTheme ? 'text-white' : 'text-custom-dark-1'}`
                        }
                    >
                        {animeData?.title}
                    </p>

                    {/* Other Details */}
                    <div className="clear-both mt-10 flex flex-col gap-y-5">
                        {/* Rating */}
                        <p className={`text-base custom-transition-duration ${isCheckedTheme ? 'text-custom-gray-1' : 'text-custom-dark-1'}`}>
                            Rating :&nbsp;
                            <span className={`text-lg font-medium custom-transition-duration  ${isCheckedTheme ? 'text-white' : 'text-custom-dark-2'}`}>
                                {fakeRating}
                            </span>
                        </p>
                        {/* Release Date */}
                        <p className={`text-base custom-transition-duration ${isCheckedTheme ? 'text-custom-gray-1' : 'text-custom-dark-1'}`}>
                            Year :&nbsp;
                            <span className={`text-lg font-medium custom-transition-duration  ${isCheckedTheme ? 'text-white' : 'text-custom-dark-2'}`}>
                                {animeData?.releaseDate}
                            </span>
                        </p>
                        {/* Episodes */}
                        <p className={`text-base custom-transition-duration ${isCheckedTheme ? 'text-custom-gray-1' : 'text-custom-dark-1'}`}>
                            Total Episodes :&nbsp;
                            <span className={`text-lg font-medium custom-transition-duration  ${isCheckedTheme ? 'text-white' : 'text-custom-dark-2'}`}>
                                {animeData?.totalEpisodes}
                            </span>
                        </p>
                        {/* Status */}
                        <p className={`text-base custom-transition-duration ${isCheckedTheme ? 'text-custom-gray-1' : 'text-custom-dark-1'}`}>
                            Status :&nbsp;
                            <span className={`text-lg font-medium custom-transition-duration  ${isCheckedTheme ? 'text-white' : 'text-custom-dark-2'}`}>
                                {animeData?.status}
                            </span>
                        </p>

                        {/* Genres */}
                        <p className={`text-base custom-transition-duration ${isCheckedTheme ? 'text-custom-gray-1' : 'text-custom-dark-1'}`}>
                            Genres : &nbsp;
                            {animeData?.genres && animeData?.genres.map((genre : string, index : number) => (
                                <span key={index} className={`text-lg font-medium custom-transition-duration  ${isCheckedTheme ? 'text-white' : 'text-custom-dark-2'}`}>
                                    {genre}
                                    {index !== animeData?.genres.length - 1 && `, `}
                                </span>
                            ))}
                        </p>

                        <div className="mt-6">
                            <p className={`text-lg font-bold custom-transition-duration ${isCheckedTheme ? 'text-white' : 'text-custom-dark-2'}`}>Available Servers</p>
                            <div className="flex flex-wrap mt-4 gap-5">
                                {episodeData && episodeData.map((res : any, index : number) => (
                                    <div key={index} className={`rounded text-xs 400size:text-sm py-2 px-5 flex justify-center disable-highlight 
                                        cursor-pointer hover:opacity-90 active:scale-95 bg-[#141D2B] text-white`}
                                        onClick={() => { setUrlValue(res?.url) ; setLoader(!loader) }}
                                    >
                                        {res?.name}
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    
                </div>
            }
   
        </div>

        <div className="max-w-[80%] sm:max-w-none ite w-10/12 mx-auto mt-16">            
            {/* Description */}
            {isLoading ?
                <div className="w-full">
                    {Array.from({ length: 4 }, (_, index) => (
                        <Skeleton key={index} className="mt-4 rounded-3xl custom-transition-duration w-full h-[1rem]"/>
                        ))
                    }
                </div>
                :
                <>
                    <p className={`text-base custom-transition-duration clear-both 
                            ${isCheckedTheme ? 'text-custom-gray-2' : 'text-custom-dark-2'}`
                        }
                    >
                        {displayedText}
                    </p>
                    
                    {/* Read More Button */
                    displayedText && displayedText.length && displayedText.length >= 420 &&
                        <p onClick={toggleDescription } 
                            className={`mt-5 xl:mt-3 text-base custom-transition-duration
                            w-[7.2rem] cursor-pointer hover:sm:text-custom-blue-1 hover:sm:underline
                            active:scale-95 ${isCheckedTheme ? 'text-custom-gray-3' : 'text-custom-dark-2'}`}
                        >
                            {shouldTrim && !showFullDescription && !showSeeLess ? 'Read more 👇' : 'See less ☝️'}
                        </p>
                    }
                </>
            }
        </div>
    </div>
  )
}
