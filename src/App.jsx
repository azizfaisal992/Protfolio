import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Project from './pages/Project'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <div>
      <Header />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project" element={<Project />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
