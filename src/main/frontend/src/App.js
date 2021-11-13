import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Main } from './components/index';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(){
    return (
        <section>
            <ToastContainer autoClose={2000}/>
            <BrowserRouter>
            <Header />
            <Main />
            <Footer />
            </BrowserRouter>
        </section>
        
    )
}

export default App;