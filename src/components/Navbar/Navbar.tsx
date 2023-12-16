import useAppStore from "../../store/ZustandStore"
import { HamburgerMenu } from "../../widgets/hamburgerMenu/HamburgerMenu"
import { ThemeToggle } from "../../widgets/themeToggle/ThemeToggle"
import { styled } from "@mui/material/styles"
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip"
import SearchIcon from "@mui/icons-material/Search"

type NavbarProps = {
    active : string
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: "1rem",
    },
}))
  
export const Navbar = ( { active } : NavbarProps ) => {
    // Theme Toggle
    const {isCheckedTheme} = useAppStore()

  return (
    <nav 
        className={`px-7 lg:px-12 py-5 flex items-center justify-between z-10
            sticky inset-0 custom-shaddow-bottom custom-transition-duration 
            ${isCheckedTheme ? 'bg-custom-dark-1' : 'bg-white'}`}
    >
        <div className="flex items-center gap-x-14">
            {/* Logo */}
            <p className={`text-xl 360size:text-2xl custom-font-moonrocks tracking-wide 
                disable-highlight cursor-pointer active:scale-95 custom-transition-duration 
                ${isCheckedTheme ? 'text-white' : 'text-custom-dark-1'}`
               }
            >
                STREAM
                <span className="text-xl 360size:text-2xl text-custom-blue-1">HIVE</span>
            </p>

            {/* Navlinks */}
            <div className={`hidden lg:flex gap-x-10  ${isCheckedTheme ? 'text-custom-gray-1' : 'text-custom-dark-1 '}`}>
                <li 
                    className={`text-base list-none cursor-pointer hover:text-custom-blue-1 
                        custom-transition-duration disable-highlight active:scale-95
                        ${active === "Home" && 'text-white font-semibold'}`}
                >
                    Home
                </li>
                <li className="text-sm list-none cursor-pointer hover:text-custom-blue-1 custom-transition-duration disable-highlight active:scale-95">Trending</li>
                <li className="text-sm list-none cursor-pointer hover:text-custom-blue-1 custom-transition-duration disable-highlight active:scale-95">Latest</li>
                <li className="text-sm list-none cursor-pointer hover:text-custom-blue-1 custom-transition-duration disable-highlight active:scale-95">Popular</li>
                <li className="text-sm list-none cursor-pointer hover:text-custom-blue-1 custom-transition-duration disable-highlight active:scale-95">My List</li>
            </div>
        </div>

        {/* Theme Toggle and Search Bar */}
        <div className="hidden lg:flex items-center gap-x-5">
            <LightTooltip title="Click here to search">
                <SearchIcon 
                    sx={{fontSize:'30px'}}
                    className={`cursor-pointer hover:opacity-80 active:scale-y-95 disable-highlight 
                    scale-x-[-1] ${isCheckedTheme ? 'text-white' : 'text-custom-dark-1 '}`}
                />
            </LightTooltip>
            <ThemeToggle/>
        </div>

        {/* Hamburge Menu on Small Devices */}
        <HamburgerMenu/>
    </nav>
  )
}
