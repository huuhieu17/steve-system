import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './main.css'
import ResponsiveOS from './components/ResponsiveOS'
const ReactPage = lazy(() => import('react_app/ReactPage'))
const VuePage = lazy(() => import('vue_app/VuePage'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ResponsiveOS />} />
          <Route path="/react" element={<ReactPage />} />
          <Route path="/vue" element={<VuePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
