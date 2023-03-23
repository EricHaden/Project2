import logo from './logo.svg';
import './App.css';
import Title from './Title';
import Webcam from "react-webcam";
import WebcamCapture from './WebcamCapture';

function App() {
  return (
      <div className="App">
        <Title />
        <WebcamCapture />
      </div>
  );
}

export default App;
