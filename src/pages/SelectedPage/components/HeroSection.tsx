import { useEffect, useState } from "react"
import { Button } from "../../../widgets/button/Button"
import playIcon from "../../../assets/icons/play.png"
import bookmark from "../../../assets/icons/bookmark.png"
import onErrorImage from "../../../assets/onErrorImage.png"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import { useAppStore, useAnimeDataPersist } from "../../../store/ZustandStore"
import { useNavigate } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { addToList, saveData } from "@/utils/saveData"

type HeroSectionProps = {
    animeData : any
    fakeRating : number | undefined
    isLoading : boolean
}

export const HeroSection = ( { animeData, fakeRating, isLoading } : HeroSectionProps) => {
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

    // Blur Effect in Lazy load
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)

    // Anime Storage Data
    const { animeDetails } = useAnimeDataPersist()
    const [lastWatchedEpisode, setLastWatchedEpisode] = useState<number>(1)
    useEffect(() => {
        const lastWatched = animeDetails.filter(item => item.animeId === animeData?.id).pop()?.watchedEpisode
        setLastWatchedEpisode(lastWatched ? lastWatched[lastWatched?.length - 1] : 1)
    },[animeData, animeDetails])

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

        <div className="mb-16 max-w-[80%] sm:max-w-none w-10/12 mx-auto">
            <p 
                className={`text-lg float-left cursor-pointer ${isCheckedTheme ? 'text-white' : 'text-custom-dark-1'}
                hover:underline hover:text-custom-blue-1 disable-highlight active:scale-95 custom-transition-duration`}
                onClick={() => navigate(-1)}
            >
                &#8592; Go Back
            </p>
        </div>
        

        <div className="max-w-[80%] sm:max-w-none w-10/12 mx-auto lg:flex gap-x-20">
            {isLoading ? 
                <Skeleton className="max-w-[85%] lg:min-w-[20rem] h-[23rem] lg:h-[26rem] sm:max-w-md mx-auto lg:mx-0 object-cover rounded-3xl"/>
                :
                <LazyLoadImage
                  onLoad={() => setImageLoaded(true)}
                  wrapperClassName={imageLoaded ? '' : 'blur-up'}
                  className="max-w-[85%] lg:min-w-[20rem] max-h-[26rem] sm:max-w-md mx-auto lg:mx-0 object-cover rounded-3xl"
                  alt="Anime Image"
                  src={animeData?.image}
                  onError={(e : any )=>{ e.target.onerror = null; e.target.src= onErrorImage}}
                />
            }

            {isLoading ?
                <div className="w-full">
                    <Skeleton className="mb-10 mt-10 lg:mt-4 rounded-3xl custom-transition-duration w-full h-[2rem]"/>
                    {Array.from({ length: 10 }, (_, index) => (
                            <Skeleton key={index} className="mt-4 rounded-3xl custom-transition-duration w-full h-[1rem]"/>
                        ))
                    }
                </div>
                :
                <div className="mt-0 lg:mt-4">
                    {/* Title */}
                    <p className={`text-2xl sm:text-3xl md:text-4xl text-center
                        lg:text-left mt-10 lg:mt-0 custom-font-rocksalt custom-transition-duration
                        ${isCheckedTheme ? 'text-white' : 'text-custom-dark-1'}`
                        }
                    >
                        {animeData?.title}
                    </p>

                    {/* Other Details */}
                    <div className="clear-both mt-10 flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-2">
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
                            {animeData?.type !== "MOVIE" ? `Total Episodes` : `Type`} :&nbsp;
                            <span className={`text-lg font-medium custom-transition-duration ${isCheckedTheme ? 'text-white' : 'text-custom-dark-2'}`}>
                                {animeData?.type !== "MOVIE" ? animeData?.totalEpisodes : animeData?.type.charAt(0)+animeData?.type.slice(1).toLowerCase()}
                            </span>
                        </p>
                        {/* Status */}
                        <p className={`text-base custom-transition-duration ${isCheckedTheme ? 'text-custom-gray-1' : 'text-custom-dark-1'}`}>
                            Status :&nbsp;
                            <span className={`text-lg font-medium custom-transition-duration  ${isCheckedTheme ? 'text-white' : 'text-custom-dark-2'}`}>
                                {animeData?.status}
                            </span>
                        </p>
                    </div>
                    
                    {/* Genres */}
                    <p className={`text-base custom-transition-duration mt-2 ${isCheckedTheme ? 'text-custom-gray-1' : 'text-custom-dark-1'} text-center lg:text-left`}>
                        Genres : &nbsp;
                        {animeData?.genres && animeData?.genres.map((genre : string, index : number) => (
                            <span key={index} className={`text-lg font-medium custom-transition-duration  ${isCheckedTheme ? 'text-white' : 'text-custom-dark-2'}`}>
                                {genre}
                                {index !== animeData?.genres.length - 1 && `, `}
                            </span>
                        ))}
                    </p>

                    {/* Buttons */}
                    <div className="clear-both mt-10 mb-7 flex flex-col sm:flex-row sm:justify-center gap-5 lg:float-left">
                        <Button
                            value = "Watch"
                            bgColor = "bg-custom-blue-1"
                            shadeColor = "bg-[#0B3D85]"
                            icon = {playIcon}
                            onClick={() => {saveData(animeData?.id, lastWatchedEpisode); navigate(`/watch/${animeData?.id}/${animeData?.id}-episode-${lastWatchedEpisode}`)}}
                        />

                        <Button
                            value = "Add to list"
                            bgColor = "bg-[#111111]"
                            shadeColor = "bg-[#141D2B]"
                            icon = {bookmark}
                            onClick={() => addToList(animeData?.id || "", animeData?.title || "", animeData?.image || "", animeData?.totalEpisodes || 0)}
                        />
                    </div>

                    {/* Description */}
                    <p className={`text-center lg:text-left text-base max-w-[60rem] custom-transition-duration
                            clear-both ${isCheckedTheme ? 'text-custom-gray-2' : 'text-custom-dark-2'}`
                        }
                    >
                        {displayedText}
                    </p>

                    {/* Read More Button */
                    displayedText && displayedText.length && displayedText.length >= 420 &&
                        <p onClick={toggleDescription } 
                            className={`mt-5 lg:mt-3 text-base text-center mx-auto lg:mx-0 lg:text-left 
                            w-[7.2rem] cursor-pointer custom-transition-duration hover:sm:text-custom-blue-1
                            hover:sm:underline active:scale-95 ${isCheckedTheme ? 'text-custom-gray-3' : 'text-custom-dark-2'}`}
                        >
                            {shouldTrim && !showFullDescription && !showSeeLess ? 'Read more 👇' : 'See less ☝️'}
                        </p>
                    }
                </div>
            }
   
        </div>
      
    </div>
  )
}
