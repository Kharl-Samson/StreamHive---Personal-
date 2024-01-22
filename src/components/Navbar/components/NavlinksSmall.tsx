
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useNavigate } from "react-router-dom"
import HomeIcon from "@mui/icons-material/Home"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"
import FiberNewIcon from "@mui/icons-material/FiberNew"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import ChecklistIcon from "@mui/icons-material/Checklist"
import SearchIcon from "@mui/icons-material/Search"
import { ThemeToggle } from "../../../widgets/themeToggle/ThemeToggle"

type NavlinksSmallProps = {
    anchorEl : null | HTMLElement
    open : boolean
    handleClose: () => void
}

export const NavlinksSmall = ({anchorEl, open, handleClose} : NavlinksSmallProps) => {
    // Page Navigator
    const navigate = useNavigate()

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >   
      <div></div>
        {/* Home */}
        <MenuItem 
          onClick={() => {handleClose() ; navigate("/")}}
        >
          <div className={`text-base font-semibold text-custom-dark-2 min-w-[13rem] flex items-center gap-x-3`}>
            <HomeIcon sx={{fontSize:'25px'}}/>
            Home
          </div>
        </MenuItem>

        {/* Trending */}
        <MenuItem 
          onClick={() => {handleClose() ; navigate("/Trending")}}
        >
          <div className={`text-base font-semibold text-custom-dark-2 min-w-[13rem] flex items-center gap-x-3`}>
            <LocalFireDepartmentIcon sx={{fontSize:'25px'}}/>
            Trending
          </div>
        </MenuItem>

        {/* Latest */}
        <MenuItem 
          onClick={() => {handleClose() ; navigate("/Latest")}}
        >
          <div className={`text-base font-semibold text-custom-dark-2 min-w-[13rem] flex items-center gap-x-3`}>
            <FiberNewIcon sx={{fontSize:'25px'}}/>
            Latest
          </div>
        </MenuItem>

        {/* Popular */}
        <MenuItem 
          onClick={() => {handleClose() ; navigate("/Popular")}}
        >
          <div className={`text-base font-semibold text-custom-dark-2 min-w-[13rem] flex items-center gap-x-3`}>
            <TrendingUpIcon sx={{fontSize:'25px'}}/>
            Popular
          </div>
        </MenuItem>

        {/* My List */}
        <MenuItem 
          onClick={() => {handleClose() ; navigate("/MyList")}}
        >
          <div className={`text-base font-semibold text-custom-dark-2 min-w-[13rem] flex items-center gap-x-3`}>
            <ChecklistIcon sx={{fontSize:'25px'}}/>
            My List
          </div>
        </MenuItem>

        <br/><hr/> 

        {/* My List */}
        <MenuItem 
          onClick={() => {handleClose() ; navigate("/Search")}}
        >
          <div className={`text-base font-semibold text-custom-dark-2 min-w-[13rem] flex items-center gap-x-3`}>
            <SearchIcon sx={{fontSize:'25px'}}/>
            Search for Anime
          </div>
        </MenuItem>

        {/* Theme Toggle */}
        <MenuItem>
          <ThemeToggle/>
        </MenuItem>

    </Menu>
  )
}
