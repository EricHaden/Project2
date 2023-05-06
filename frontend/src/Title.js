import React, {useState} from 'react'
import './Title.css';
import WebcamCapture from './WebcamCapture';
import { Link } from 'react-router-dom';
import Popup from './Popup';

function Title() {
  // allow popupRef be a reference to pop up window
  const popupRef = React.useRef();
  
  const [response, setResponse] = useState(null);

  // function to handle response from the backend server
  // set response to data for later use
  // pop up a window
  const handleResponse = (data) => {
    setResponse(data);
    popupRef.current.setModalIsOpen(true);
  }

  return (
 <div>
  {/* create background */}
      <div className="background-image"></div>
      {/* create header block */}
        <div className="header-title">
          {/* create button link to about page */}
          <Link to="/About">
            <button className="pixel"><p>About</p></button>
          </Link>
          {/* create button link to mode selection page */}
          <Link to="/">
            <button className="pixel"><p>Mode Selection</p></button>
          </Link>
          {/* create button link to ece webpage */}
          <button className='pixel' onClick={() => popupRef.current.setModalIsOpen(true)}><p>Show Result</p></button>
          <a href="https://ece.ubc.ca/" target="_blank" rel="noopener noreferrer">
            <button className="pixel"><p>UBC ECE</p></button>
          </a>
        </div>

      <div className='centered'>
        {/* create webcam object 
          * call handleResponse once receive a response from the backend server
         */}
        <WebcamCapture onResponse={handleResponse}/>
        {/* create pop up window object
          * set popupRef to ref and response to response as its properties
         */}
        <Popup ref={popupRef} response={response} />
      </div>
</div>
  );
}

export default Title;