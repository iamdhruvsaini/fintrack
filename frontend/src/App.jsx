
import './App.css'
import { ThemeProvider } from './components/providers/theme-provider'
import { Outlet } from "react-router-dom";

function App() {


  return (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div>
      <Outlet></Outlet>
    </div>
  </ThemeProvider>
  )
}

export default App
