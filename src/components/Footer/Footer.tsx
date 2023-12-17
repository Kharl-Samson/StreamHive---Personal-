import useAppStore from "../../store/ZustandStore"

export const Footer = () => {
  // Theme Toggle
  const {isCheckedTheme} = useAppStore()

  return (
    <footer 
        className={`py-14 custom-transition-duration
        border-t-2 border-custom-blue-1
        ${isCheckedTheme ? 'bg-custom-dark-1' : 'bg-custom-dark-2'}`}
    >
        <div className="max-w-[80%] sm:max-w-none w-10/12 mx-auto flex flex-col items-center">

            {/* Logo */}
            <p className="text-xl 360size:text-3xl custom-font-moonrocks tracking-wide text-white
                disable-highlight cursor-pointer active:scale-95 custom-transition-duration"
            >
                STREAM
                <span className="text-xl 360size:text-3xl custom-transition-duration text-custom-blue-1">HIVE</span>
            </p>

            <p className="text-base text-white text-center mt-3">
                This site was developed by Kharl. It cannot and should not be reproduced in any forms or by any means without the consent from him.
            </p>

            <p className="mt-3 text-base text-white">{new Date().getFullYear()} - StreamHive. All rights reserved.</p>
        </div>
    </footer>
  )
}
