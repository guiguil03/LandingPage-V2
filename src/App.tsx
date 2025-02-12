import './App.css'
import Header from './components/Header'
import Map from './components/map'
import Grille from './components/Grille'
import Footer from './components/footer'
import Avis from './components/avis'

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Map/>
      <Grille/>
      <Avis/>
      <Footer/>
    </div>
  )
}

export default App
