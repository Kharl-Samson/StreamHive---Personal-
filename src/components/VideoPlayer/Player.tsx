import { RefObject, useEffect } from "react"

type PlayerProps = {
    dataUrl : string
    serverName : string
    iframeRef: RefObject<HTMLIFrameElement>
    frameStyle : string
}

export const Player = ({dataUrl, serverName, iframeRef, frameStyle} : PlayerProps) => {
    // Dynamic Iframe Height
    useEffect(() => {
      const handleHeight = (event : MessageEvent) => {
        if (iframeRef.current && event.data && event.data.type === 'iframeHeight') {
          iframeRef.current.style.height = `${event.data.height}px`
        }
      }
      window.addEventListener('message', handleHeight)
      return () => {
        window.removeEventListener('message', handleHeight)
      }
    }, [])

    // Iframe Props
    const iframeProps = {
      allowFullScreen: true,
      scrolling: "no",
      ref: iframeRef,
      title: "Video Player",
      className: `w-[100%] xl:max-w-[45rem] h-auto min-h-[16.5rem] 580size:min-h-[17rem]
                600size:min-h-[21rem] 700size:min-h-[24rem] 800size:min-h-[27rem]
                900size:min-h-[30rem] 1000size:min-h-[32rem] 1100size:min-h-[36rem]
                1220size:min-h-[38rem] xl:min-h-0 ${frameStyle}
                ${serverName === "Filelions" || serverName === "Streamwish" && 'rounded-xl'}`
    }

  return (
    <>
      <iframe
        src={dataUrl} 
        {...iframeProps}
        sandbox={
          serverName === "Filelions"
            ? "allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-top-navigation allow-forms"
            : undefined
        }
      />
    </>
  )
}
