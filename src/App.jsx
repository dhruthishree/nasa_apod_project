import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

export default function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  )

  const handleToggleModal = () => {
    setShowModal(prev => !prev)
  }

  useEffect(() => {
    async function fetchAPOD() {
      try {
        const NASA_KEY = import.meta.env.VITE_NASA_API_KEY

        if (!NASA_KEY) {
          throw new Error("NASA API key missing in .env file")
        }

        setLoading(true)
        setError(null)

        const cacheKey = `NASA-${selectedDate}`
        const cached = localStorage.getItem(cacheKey)

        // ✅ Return cached data if available
        if (cached) {
          setData(JSON.parse(cached))
          setLoading(false)
          console.log("Loaded from cache")
          return
        }

        const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${selectedDate}`

        const res = await fetch(url)

        if (!res.ok) {
          throw new Error("Failed to fetch from NASA API")
        }

        const result = await res.json()

        localStorage.setItem(cacheKey, JSON.stringify(result))
        setData(result)

        console.log("Loaded from API")
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAPOD()
  }, [selectedDate])

  return (
    <>
      {/* Loading */}
      {loading && (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="errorState">
          <p>{error}</p>
        </div>
      )}

      {/* Main App */}
      {!loading && !error && data && (
        <>
          <Main data={data} />

          {showModal && (
            <SideBar
              data={data}
              handleToggleModal={handleToggleModal}
            />
          )}

          <Footer
            data={data}
            handleToggleModal={handleToggleModal}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </>
      )}
    </>
  )
}