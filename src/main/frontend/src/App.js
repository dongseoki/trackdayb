import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Main } from './components/index';
import { BrowserRouter } from 'react-router-dom';

function App(){
    return (
        <section>
            <BrowserRouter>
            <Header />
            <Main />
            <Footer />
            </BrowserRouter>
        </section>
        
    )
}

export default App;