import { useEffect } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CountryToast from './components/CountryToast.jsx'
import Home from './pages/Home.jsx'
import Pricing from './pages/Pricing.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Chrome() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CountryToast />
    </>
  )
}

export default function App() {
  return (
    <div className="page">
      <ScrollToTop />
      <Routes>
        <Route element={<Chrome />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
        </Route>
      </Routes>
    </div>
  )
}
