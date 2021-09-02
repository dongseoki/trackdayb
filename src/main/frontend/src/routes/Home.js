import React, {useState, useEffect} from 'react';
import logo from '../logo.svg';
import "./Home.css"

function Home () {
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch('/api/hello')
        .then(response => response.text())
        .then(message => {
            setMessage(message);
        });
    },[])
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">{message}</h1>
                <p>test22222</p>
            </header>
        </div>
    )
}
export default Home;