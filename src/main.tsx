import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'
import '@fontsource/nunito/800.css'
import '@fontsource/dancing-script/700.css'
import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Không tìm thấy #root')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
