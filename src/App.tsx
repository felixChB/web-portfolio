import { useState } from 'react'
import './App.css'
import './styles/global.css'
import './styles/home-page.css'
import { Header } from './components/Header'
import { BurgerMenu } from './components/BurgerMenu'

function App() {
  const [section, setSection] = useState('Home')

  return (
    <>
      <Header />
      <BurgerMenu />
    </>
      
  )
}

export default App
