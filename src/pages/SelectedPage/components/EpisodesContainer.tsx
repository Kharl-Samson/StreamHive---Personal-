import useAppStore from '@/store/ZustandStore'
import { useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"

type EpisodesContainerProps = {
    animeData : any
    isLoading : boolean
}

export const EpisodesContainer = ({ animeData, isLoading } : EpisodesContainerProps) => {
    // Theme Toggle
    const {isCheckedTheme} = useAppStore()

    // Pagination Controlle
    const [page, setPage] = useState<{ startPage: number; endPage: number }>({
        startPage: 1,
        endPage: 100,
    })

  return (
    <section className={`min-h-[40rem] w-full custom-transition-duration pb-20 ${isCheckedTheme ? 'bg-custom-dark-1' : 'bg-white'}`}>
        <div className={`max-w-[80%] sm:max-w-none w-10/12 mx-auto mt-16`}>
            {/* Headers */}
            <h1 className={`text-4xl font-semibold text-center lg:text-left pt-0
              custom-transition-duration ${isCheckedTheme ? 'text-custom-gray-4 ' : 'text-custom-dark-1'}`}
            >
              All Episodes
            </h1>

            <div className="flex flex-col lg:flex-row justify-between items-center border-b-2 border-custom-blue-1 pb-5 gap-x-10 mt-4 lg:mt-2">
                <p className={`text-base  text-center lg:text-left custom-transition-duration ${isCheckedTheme ? 'text-custom-gray-1' : 'text-custom-dark-2'}`}>
                    Unwind and savor the pleasure of watching your favorite shows for a relaxing and enjoyable experience.
                </p>

                  {/* <button className={`mt-4 lg:mt-[-.50rem] whitespace-nowrap active:scale-95
                    border-2 px-5 py-2 rounded-full disable-highlight custom-transition-duration
                    ${isCheckedTheme ? 'hover:border-custom-blue-1 hover:text-custom-blue-1 text-custom-gray-1 border-custom-gray-1' : 
                    'hover:border-custom-dark-1 hover:text-custom-dark-1 text-custom-blue-1 border-custom-blue-1'}`}
                    onClick={() => navigate(`/${type}`)}
                  >
                      See All &#62;
                  </button> */}
            </div>
        </div>

        {/* Episodes Container */}
        <div className="`max-w-[80%] sm:max-w-none w-10/12 mx-auto mt-10 grid gap-5 
            grid-cols-2 500size:grid-cols-3 sm:grid-cols-4 800size:grid-cols-5 lg:grid-cols-6
            1220size:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 1700size:grid-cols-10"
        >
            {isLoading ?
                Array.from({ length: 100 }, (_, index) => (
                        <Skeleton key={index} className="rounded w-full h-[2rem]"/>
                )) 
            :
                animeData?.episodes?.map((res: any) => {
                  if (res?.number && page?.startPage <= res.number && res.number <= page?.endPage) {
                      return (
                        <div
                          className="bg-[#122532] rounded text-sm text-white py-2 flex justify-center 
                            disable-highlight cursor-pointer hover:opacity-90 active:scale-95"
                          key={res?.id}
                        >
                          EP {res?.number} &nbsp;<span className='text-sm text-custom-gray-1 uppercase'>| {animeData?.subOrDub}</span>
                        </div>
                      )
                    }
                })
            }
        </div>
    </section>
  )
}
