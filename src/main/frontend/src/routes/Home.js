import React, {useState, useEffect} from 'react';
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
        <div className="home">
            <h1 className="App-title">{message}</h1>
            <p>Track</p>
            <p>Your</p>
            <p>Day</p>
        </div>
    )
}
export default Home;