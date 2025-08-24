import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SystemProvider } from './contexts/user-context.tsx'

createRoot(document.getElementById('root')!).render(
    <SystemProvider>
      <App />
    </SystemProvider>
)
