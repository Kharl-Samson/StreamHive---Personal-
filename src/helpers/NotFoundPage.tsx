import { useNavigate } from "react-router-dom"

export const NotFoundPage = () => {
    // Page Navigator
    const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="text-center mx-auto max-w-[90%]">
            <h1 className="mb-4 text-5xl font-semibold text-custom-blue-1">Page not found</h1>
            <p className="mb-10 text-lg text-custom-gray-1">Sorry, the page you're looking for doesn't exist.</p>
            <div className="animate-bounce">
              <svg className="mx-auto h-16 w-16 text-custom-blue-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </div>
            <p className="mt-4 text-custom-gray-1">
                Let's get you back <span className="text-custom-blue-1 cursor-pointer hover:underline" onClick={() => navigate("/")}>home</span>.
            </p>
        </div>
    </div>
  )
}
