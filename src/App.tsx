import { useState } from 'react'
import './App.css'
import './styles/global.css'
import './styles/home-page.css'
import { Header } from './components/Header'
import { BurgerMenu } from './components/BurgerMenu'
import { Footer } from './components/Footer'

function App() {
  const [section, setSection] = useState('Home')

  return (
    <>
      <Header />
      <BurgerMenu />
      <Footer />
    </>
      
  )
}

export default App
