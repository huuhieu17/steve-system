import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ResponsiveOS from './components/ResponsiveOS'
import './main.css'
// const ReactPage = lazy(() => import('react_app/ReactPage'))
// const VuePage = lazy(() => import('vue_app/VuePage'))

export default function App() {
  document.title = 'Steve System'
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ResponsiveOS />} />
          {/* <Route path="/react" element={<ReactPage />} />
          <Route path="/vue" element={<VuePage />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
