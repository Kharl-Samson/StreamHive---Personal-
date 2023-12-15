import useAppStore from "../../store/ZustandStore"
import "./HamburgerMenu.css"

export const HamburgerMenu = () => {
    // Theme Toggle
    const {isCheckedTheme} = useAppStore()

  return (
    <label className="hamburger flex lg:hidden">
      <input type="checkbox"/>
      <svg viewBox="0 0 32 32">
        <path className={`line line-top-bottom ${isCheckedTheme ? 'stroke-[white]' : 'stroke-[black]'}`} d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
        <path className={`line ${isCheckedTheme ? 'stroke-[white]' : 'stroke-[black]'}`} d="M7 16 27 16"></path>
      </svg>
    </label>
  )
}
