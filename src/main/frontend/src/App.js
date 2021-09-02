// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

// function App () {
//     const [message, setMessage] = useState("");
//     useEffect(() => {
//         fetch('/api/hello')
//         .then(response => response.text())
//         .then(message => {
//             setMessage(message);
//         });
//     },[])
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo"/>
//                 <h1 className="App-title">{message}</h1>
//                 <p>test22222</p>
//             </header>
//             <p className="App-intro">
//                 testTo get started2222, edit <code>src/App.js</code> and save to reload.
//             </p>
//             <Test />
//         </div>
//     )
// }
// export default App;

// // 출처: https://sundries-in-myidea.tistory.com/71 [얇고 넓은 개발 블로그]


// import { HashRouter, Route } from "react-router-dom"; //BrouserRouter 사용시 # 없앨수있음
// import Home from "./routes/Home";
// import About from "./routes/About";
// import Navigation from './components/Navigation';
import Header from './components/Header';
import Footer from './components/Footer';

function App(){
    return (
        <div>
            <Header />
        
            <Footer />
        </div>
        
    )
}

export default App;