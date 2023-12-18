import { useAppStore } from "../../../store/ZustandStore"
import { useNavigate } from "react-router-dom"

type NavlinksLargeProps = {
    active? : string
}
export const NavlinksLarge = ({active} : NavlinksLargeProps) => {
    // Theme Toggle
    const {isCheckedTheme} = useAppStore()
    // Page Navigator
    const navigate = useNavigate()

  return (
    <div className={`hidden lg:flex gap-x-10  ${isCheckedTheme ? 'text-custom-gray-1' : 'text-custom-dark-1 '}`}>
        {/* Home */}
        <li 
            className={`text-base list-none cursor-pointer hover:text-custom-blue-1 
                custom-transition-duration disable-highlight active:scale-95 font-normal
                ${active === "Home" && isCheckedTheme ? 'text-white font-semibold' : active === "Home" && !isCheckedTheme ? 'font-semibold' : 'font-normal'}`}
            onClick={() => navigate("/")}
        >
            Home
        </li>
        {/* Trending */}
        <li 
            className={`text-base list-none cursor-pointer hover:text-custom-blue-1 
                custom-transition-duration disable-highlight active:scale-95 font-normal
                ${active === "Trending" && isCheckedTheme ? 'text-white font-semibold' : active === "Trending" && !isCheckedTheme ? 'font-semibold' : 'font-normal'}`}
            onClick={() => navigate("/Trending")}
        >
            Trending
        </li>
        {/* Latest */}
        <li 
            className={`text-base list-none cursor-pointer hover:text-custom-blue-1 
                custom-transition-duration disable-highlight active:scale-95 font-normal
                ${active === "Latest" && isCheckedTheme ? 'text-white font-semibold' : active === "Latest" && !isCheckedTheme ? 'font-semibold' : 'font-normal'}`}
            onClick={() => navigate("/Latest")}
        >
            Latest
        </li>
        {/* Popular */}
        <li 
            className={`text-base list-none cursor-pointer hover:text-custom-blue-1 
                custom-transition-duration disable-highlight active:scale-95 font-normal
                ${active === "Popular" && isCheckedTheme ? 'text-white font-semibold' : active === "Popular" && !isCheckedTheme ? 'font-semibold' : 'font-normal'}`}
            onClick={() => navigate("/Popular")}
        >
            Popular
        </li>
        <li className="text-base list-none cursor-pointer hover:text-custom-blue-1 custom-transition-duration disable-highlight active:scale-95">My List</li>
    </div>
  )
}
