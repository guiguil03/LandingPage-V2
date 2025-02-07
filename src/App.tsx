import './App.css'
import Header from './components/Header'
import Map from './components/map'
import Grille from './components/Grille'

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Map/>
      <Grille/>
    </div>
  )
}

export default App
