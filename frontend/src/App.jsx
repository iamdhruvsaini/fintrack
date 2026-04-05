
import './App.css'
import DashboardPage from './app/dashboard/dashboard'
import { ThemeProvider } from './components/providers/theme-provider'

function App() {


  return (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <DashboardPage/>
  </ThemeProvider>
  )
}

export default App
