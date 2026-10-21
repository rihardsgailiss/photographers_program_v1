import { Outlet } from 'react-router-dom'
import Sidebar from '../components/studio/Sidebar.jsx'
import './DashboardLayout.css'

export default function DashboardLayout() {
  return (
    <div className="studio dash">
      <Sidebar />
      <main className="dash__main">
        <Outlet />
      </main>
    </div>
  )
}
