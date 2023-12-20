import { useEffect, useRef, useState } from "react"
import { useAppStore } from "../../../store/ZustandStore"
import { useNavigate } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { Player } from "@/components/VideoPlayer/Player"
import { saveData } from "@/utils/saveData"

type HeroSectionProps = {
    animeData : any
    episodeData : any
    fakeRating : number | undefined
    isLoading : boolean
    dataId? : string
    myEpisodeId : string
}

export const HeroSection = ( { animeData, episodeData, fakeRating, isLoading, dataId, myEpisodeId } : HeroSectionProps) => {
    // Theme Toggle
    const {isCheckedTheme} = useAppStore()

    // Page Navigator
    const navigate = useNavigate()

    // Episode Numder Data
    const inputString : string = myEpisodeId
    const arrayFromString : any = inputString.split("-")
    const currentEpisode : any = arrayFromString[arrayFromString?.length - 1]

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
    const [serverName, setServerName] = useState<string>("")

    // Trigger When Page Loads
    useEffect(() => {
        const filelionsUrl = episodeData?.find((item : any) => item?.name === "Filelions")
        const streamwishUrl = episodeData?.find((item : any) => item?.name === "Streamwish")
        const vidstreamingUrl = episodeData?.find((item : any) => item?.name === "Vidstreaming")
        const gogoServerUrl = episodeData?.find((item : any) => item?.name === "Gogo server")
        const mp4UploadUrl = episodeData?.find((item : any) => item?.name === "Mp4Upload")

        if (filelionsUrl) {
            setServerName("Filelions")
            setFrameUrl(filelionsUrl?.url || '')
        }
        else if (streamwishUrl) {
            setServerName("Streamwish")
            setFrameUrl(streamwishUrl?.url || '')
        }  
        else if (vidstreamingUrl){
            setServerName("Vidstreaming")
            setFrameUrl(vidstreamingUrl?.url || '')
        }
        else if (gogoServerUrl){
            setServerName("Gogo server")
            setFrameUrl(gogoServerUrl?.url || '')
        }
        else if (mp4UploadUrl){
            setServerName("Mp4Upload")
            setFrameUrl(mp4UploadUrl?.url || '')
        }
        else{
            setServerName("Other Server")
        }
    }, [episodeData, currentEpisode])

    // Trigger Every Time this data changed -> episodeData, urlValue, isLoading, serverName
    useEffect(() => {
        const filelionsUrl = episodeData?.find((item : any) => item?.name === 'Filelions')
        const streamwishUrl = episodeData?.find((item : any) => item?.name === 'Streamwish')
        const vidstreamingUrl = episodeData?.find((item : any) => item?.name === "Vidstreaming")
        const gogoServerUrl = episodeData?.find((item : any) => item?.name === "Gogo server")
        const mp4UploadUrl = episodeData?.find((item : any) => item?.name === "Mp4Upload")

        if (filelionsUrl?.name === serverName) {
            setServerName("Filelions")
            setFrameUrl(filelionsUrl?.url || '')
        } 
        else if (streamwishUrl?.name === serverName) {
            setServerName("Streamwish")
            setFrameUrl(streamwishUrl?.url || '')
        } 
        else if (vidstreamingUrl === serverName){
            setServerName("Vidstreaming")
            setFrameUrl(vidstreamingUrl?.url || '')
        }
        else if (gogoServerUrl === serverName){
            setServerName("Gogo server")
            setFrameUrl(gogoServerUrl?.url || '')
        }
        else if (mp4UploadUrl === serverName){
            setServerName("Mp4Upload")
            setFrameUrl(mp4UploadUrl?.url || '')
        }
        else {
            setFrameUrl(episodeData && episodeData[0]?.url)
        }
    },[episodeData, urlValue, isLoading, serverName])

    // Loading Skeleton
    const [loader, setLoader] = useState<boolean>(true)
    useEffect(() => {
        if(isLoading || loader){
            const timer = setTimeout(() => {
                setLoader(false)
            }, 1000)
            return () => clearTimeout(timer)
        }
    },[loader, isLoading])

    // To Full Screen Iframe
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

    // Get User's Operating System
    const operatingSystem = navigator.platform // Get the user"s operating system

    // Pagination Controller

    // Trigger Next Page
    const nextPage = () => {
        setLoader(true)
        saveData(dataId || "", parseInt(currentEpisode) + 1)
        navigate(`/watch/${dataId}/${dataId}-episode-${parseInt(currentEpisode) + 1}`)
    }
    // Trigger Prev Page
    const prevPage = () => {
        setLoader(true)
        saveData(dataId || "", parseInt(currentEpisode) - 1)
        navigate(`/watch/${dataId}/${dataId}-episode-${parseInt(currentEpisode) - 1}`)
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

            <div className="flex flex-wrap sm:justify-between xl:justify-start 1460size:justify-between gap-3 w-[100%] 1460size:max-w-[45rem] clear-both">
                {/* Allow Fulls Screen */
                operatingSystem.includes("Win") &&
                    <button 
                        onClick={handleFullscreen}
                        className={`text-white bg-custom-dark-2 py-2 rounded-md w-full 500size:w-[10rem] 
                            disable-highlight custom-transition-duration sm:hover:bg-custom-dark-1 
                            active:scale-95 whitespace-nowrap ${isLoading ? 'invisible' : 'visible'}`}
                    >
                      Allow Fullscreen
                    </button>
                }
                
                <div className="flex flex-wrap sm:justify-end gap-3 w-full 500size:w-auto">
                    {/* Prev Button */
                    parseInt(currentEpisode) !== 1 &&
                        <button 
                            className={`text-white bg-custom-blue-1 py-2 rounded-md w-full 500size:w-[10rem] 
                                disable-highlight custom-transition-duration sm:hover:bg-custom-dark-2 
                                active:scale-95 whitespace-nowrap ${isLoading && 'pointer-events-none opacity-80'}`}
                            onClick={prevPage}
                        >
                          &#8592; Prev Episode
                        </button>
                    }
                    
                    {/* Next Button */
                    animeData?.totalEpisodes !== parseInt(currentEpisode) &&
                        <button 
                          className={`text-white bg-custom-blue-1 py-2 rounded-md w-full 500size:w-[10rem] 
                              disable-highlight custom-transition-duration sm:hover:bg-custom-dark-2 
                              active:scale-95 whitespace-nowrap ${isLoading && 'pointer-events-none opacity-80'}`}
                            onClick={nextPage}
                        >
                          Next Episode &#8594;
                        </button>
                    }
                </div>
            </div>
        </div>
        
        <div className="max-w-[80%] sm:max-w-none w-10/12 mx-auto xl:flex gap-x-20">
                {/* Skeleton for Video Player */}
                <Skeleton 
                    className={`w-[100%] xl:max-w-[45rem]
                        h-auto min-h-[16.5rem] 580size:min-h-[17rem]
                        600size:min-h-[21rem] 700size:min-h-[24rem] 800size:min-h-[27rem]
                        900size:min-h-[30rem] 1000size:min-h-[32rem] 1100size:min-h-[36rem] 
                        1220size:min-h-[38rem] xl:min-h-0
                        mx-auto xl:mx-0 object-cover rounded-3xl ${isLoading || loader ? 'block' : 'hidden'}`}
                />

                {/* Video Player */}
                <Player 
                   dataUrl = {frameUrl} 
                   serverName = {serverName}
                   iframeRef = {iframeRef} 
                   frameStyle = {isLoading || loader ? 'hidden' : 'block'}
                />

            {isLoading ?
                <div className="w-full">
                    <Skeleton className="mb-10 mt-10 xl:mt-4 rounded-3xl custom-transition-duration w-full h-[2rem]"/>
                    {Array.from({ length: 10 }, (_, index) => (
                            <Skeleton key={index} className="mt-4 rounded-3xl custom-transition-duration w-full h-[1rem]"/>
                        ))
                    }
                </div>
                :
                <div className="mt-5 xl:mt-0 xl:mb-4">
                    {/* Episode Number */}
                    <p className={`text-xl font-semibold custom-transition-duration ${isCheckedTheme ? 'text-white' : 'text-custom-dark-2'}`}>
                            Episode {currentEpisode}
                    </p>

                    {/* Title */}
                    <p className={`text-2xl sm:text-3xl md:text-4xl mt-4 custom-font-rocksalt custom-transition-duration
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

                        {/* Available Servers */}
                        <div className="mt-6">
                            <p className={`text-lg font-bold custom-transition-duration ${isCheckedTheme ? 'text-white' : 'text-custom-dark-2'}`}>Available Servers</p>
                            <div className="flex flex-wrap mt-4 gap-5">
                                {episodeData && episodeData.map((res : any, index : number) => (
                                    <div key={index} className={`rounded text-xs 400size:text-sm py-2 px-5 flex justify-center disable-highlight 
                                        cursor-pointer hover:opacity-90 active:scale-95 text-white
                                        ${serverName === res?.name ? 'bg-custom-blue-1' : 'bg-[#141D2B]'}
                                        `}
                                        onClick={() => { setServerName(res?.name); setUrlValue(res?.url) ; setLoader(!loader) }}
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
