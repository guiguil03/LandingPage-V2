import './App.css'
import Header from './components/Header'
import Map from './components/map'
import Grille from './components/Grille'
import Image from './components/image'
import Avis from './components/avis'
import Footer from './components/footer'

function App() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <Header />
      <Map/>
      <Grille/>
      <Avis/>
      <Image/>
      <Footer/>
    </div>
  )
}

export default App
