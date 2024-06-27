import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage'
import AddPage from './pages/AddPage'

function App() {


  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/add-movie" element={<AddPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
