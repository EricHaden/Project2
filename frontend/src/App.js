import logo from './logo.svg';
import './App.css';
import Title from './Title';
import Webcam from "react-webcam";
import Home from './Home'
import About from './About'
import WebcamCapture from './WebcamCapture';

import { Routes, Route,  Link, BrowserRouter, HashRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter basename="/">

        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/Title" element={<Title/>}/>
          <Route  path="/WebCam" element={<WebcamCapture/>}/> 
          <Route path="/About" element={<About/>}/>
        </Routes>
      </HashRouter>
    </div>
      // <div className="App">
      //   <Title />
      //   <WebcamCapture />
      // </div>
  );
}

export default App;