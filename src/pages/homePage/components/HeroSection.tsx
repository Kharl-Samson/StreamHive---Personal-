import { useEffect, useState } from "react"
import heroData from "../../../data/heroData"
import { Button } from "../../../widgets/button/Button"
import playIcon from "../../../assets/icons/play.png"
import bookmark from "../../../assets/icons/bookmark.png"
import onErrorImage from "../../../assets/onErrorImage.png"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

type HeroData = {
    title : string
    description : string
    backgroundImage : string
    image : string
    rating : number
    releaseDate : number
    totalEpisodes: number
    genres: string[]
}

export const HeroSection = () => {
    // Anime Data from my data folder
    const [dataArray, setDataArray] = useState<HeroData>()

    // Setting up data once the page is load
    useEffect(() => {
        const randomNumber = Math.random() * heroData.length
        setDataArray(heroData[Math.floor(randomNumber)])
    },[])

    // Description trimmer
    const [showFullDescription, setShowFullDescription] = useState<boolean>(false)
    const [showSeeLess, setShowSeeLess] = useState<boolean>(false)
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription)
        setShowSeeLess(!showSeeLess)
    }

    const maxLength = 420;
    const shouldTrim = dataArray?.description?.length  && dataArray?.description?.length > maxLength && !showFullDescription
    const displayedText = shouldTrim ? `${dataArray?.description?.slice(0, maxLength)}.....` : dataArray?.description
    
    // Blur Effect in Lazy load
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  return (
    <div 
        className="min-h-[57rem] custom-gradient-bg-dark flex lg:items-center" 
        style={{
            background: `radial-gradient(40.56% 36.62% at 63.93% 48.85%, 
              rgba(149, 149, 149, 0.00) 0%, rgba(0, 0, 0, 0.20) 100%), 
              linear-gradient(0deg, rgba(7, 13, 17, 0.95) 0%, 
              rgba(7, 13, 17, 0.95) 100%), 
              url(${dataArray?.backgroundImage}) no-repeat lightgray 70% / cover`
        }}
    >
        <div className="max-w-[80%] sm:max-w-none w-10/12 mx-auto mt-20 lg:mt-[-12rem] lg:flex gap-x-20">
            <LazyLoadImage
              onLoad={() => setImageLoaded(true)}
              wrapperClassName={imageLoaded ? '' : 'blur-up'}
              className="max-w-[85%] max-h-[26rem] sm:max-w-md mx-auto lg:mx-0 object-cover rounded-3xl"
              alt="Anime Image"
              src={dataArray?.image}
              onError={(e : any )=>{ e.target.onerror = null; e.target.src= onErrorImage}}
            />

            <div className="mt-0 lg:mt-4">
                <p className="text-2xl sm:text-3xl md:text-4xl text-center lg:text-left text-white mt-10 lg:mt-0 custom-font-rocksalt">{dataArray?.title}</p>
                <p className="text-center lg:text-left text-custom-gray-2 text-base mt-5 max-w-[60rem]">{displayedText}</p>

                {/* Read More Button */}
                <p onClick={toggleDescription } 
                    className="mt-5 lg:mt-3 text-custom-gray-3 text-base text-center mx-auto lg:mx-0 lg:text-left 
                    w-[7.2rem] cursor-pointer custom-transition-duration hover:sm:text-custom-blue-1
                    hover:sm:underline active:scale-95"
                >
                    {shouldTrim && !showFullDescription && !showSeeLess ? 'Read more 👇' : 'See less ☝️'}
                </p>

                {/* Buttons */}
                <div className="clear-both mt-10 lg:mt-12 flex flex-col sm:flex-row sm:justify-center gap-5 lg:float-left">
                    <Button
                        value = "Watch"
                        bgColor = "bg-custom-blue-1"
                        shadeColor = "bg-[#0B3D85]"
                        icon = {playIcon}
                    />

                    <Button
                        value = "Add to list"
                        bgColor = "bg-[#111111]"
                        shadeColor = "bg-[#141D2B]"
                        icon = {bookmark}
                    />
                </div>

                {/* Other Details */}
                <div className="clear-both mt-14 mb-28 lg:mb-0 lg:mt-[9rem] flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-2">
                    <p className="text-base text-custom-gray-1">Rating : <span className="text-lg font-medium text-white">{dataArray?.rating}</span></p>
                    <p className="text-base text-custom-gray-1">Year : <span className="text-lg font-medium text-white">{dataArray?.releaseDate}</span></p>
                    <p className="text-base text-custom-gray-1">Episodes : <span className="text-lg font-medium text-white">{dataArray?.totalEpisodes}</span></p>
                    <p className="text-base text-custom-gray-1 text-center lg:text-left">Genres : &nbsp;
                        {dataArray?.genres && dataArray?.genres.map((genre, index) => (
                            <span key={index} className="text-lg font-medium text-white">
                                {genre}
                                {index !== dataArray?.genres.length - 1 && `, `}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </div>
      
    </div>
  )
}
