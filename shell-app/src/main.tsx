import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SystemProvider } from './contexts/user-context.tsx'
import { Theme } from '@radix-ui/themes'

createRoot(document.getElementById('root')!).render(
  <SystemProvider>
    <Theme>
      <App />
    </Theme>

  </SystemProvider>
)
