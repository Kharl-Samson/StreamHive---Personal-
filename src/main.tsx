import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import "./styles/styles.css"
import { QueryClientProvider, QueryClient } from "react-query"
import { ScrollToTop } from "./helpers/ScrollToTop.ts"

const queryClient = new QueryClient({defaultOptions : {
  queries : {
    refetchOnWindowFocus : false,
  }   
}})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop/>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
