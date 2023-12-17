type ButtonProps = {
    value : string
    bgColor : string
    shadeColor? : string
    icon? : string
    onClick? : () => void
}

export const Button = ({ value, bgColor, shadeColor, icon, onClick } : ButtonProps) => {
  return (
    <button className={`text-white text-base rounded-3xl custom-shadow-button
        disable-highlight flex items-center justify-center sm:justify-start gap-x-3 pl-6 pr-2 py-1 ${bgColor}
        custom-transition-duration hover:opacity-80`
        }
        onClick={onClick}
    >
        {value}
        <div className={`${shadeColor} py-3 w-14 flex justify-center rounded-3xl`}>
            <img src={icon} alt="Button Icon" className="h-4"/>
        </div>
    </button>
  )
}
