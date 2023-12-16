import useAppStore from "../../store/ZustandStore"
import { LazyLoadImage } from "react-lazy-load-image-component"
import onErrorImage from "../../assets/onErrorImage.png"
import { useState } from "react"

type ItemProps = {
    id : string
    title : string
    image : string
    genres : string[]
}

export const Item = ({id, title, image, genres} : ItemProps ) => {
    // Theme Toggle
    const {isCheckedTheme} = useAppStore()

    // Blur Effect in Lazy load
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)

    console.log(id)
  return (
    <div className="w-full max-w-[17rem] sm:max-w-none mx-auto sm:mx-0">
        <div>
            <LazyLoadImage
              onLoad={() => setImageLoaded(true)}
              wrapperClassName={imageLoaded ? '' : 'blur-up'}
              className="rounded-2xl w-full h-[20rem] object-cover"
              alt="Anime Image"
              src={image}
              onError={(e : any )=>{ e.target.onerror = null; e.target.src= onErrorImage}}
            />

            <p className="text-white text-sm bg-custom-blue-1 absolute px-3 py-1 rounded-full mt-[-19rem] ml-3 disable-highlight">
                ONGOING
            </p>

            {/* Name */}
            <p className={`text-base font-semibold mt-2 custom-transition-duration text-center 
                sm:text-left ${isCheckedTheme ? 'text-white' : 'text-custom-dark-1'}`}
            >
                {title}
            </p>
            {/* Sub Details */}
            <div className="mt-1 flex gap-x-2 flex-wrap justify-center sm:justify-start text-custom-gray-1">
                {genres && genres.map((genre, index) =>  index < 3 && <p key={index} className="text-sm">• {genre}</p>)}
            </div>
        </div>
    </div>
  )
}
