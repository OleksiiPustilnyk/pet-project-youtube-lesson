import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import '../src/styles/App.css'

import Navbar from './components/UI/navbar/Navbar'
import AppRouter from './components/AppRouter'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    )
}

export default App
