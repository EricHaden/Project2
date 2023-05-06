import React from 'react';
import Webcam from 'react-webcam';
import './Title.css';

const WebcamCapture = ({onResponse}) => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const capture = React.useCallback(() => {
    
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    // Create a FormData object and append the captured image to it
    const formData = new FormData();
    formData.append('image', imageSrc);
    
    // Send a POST request to the server to upload the image
    fetch('http://172.28.90.45:8080/upload', { 
      method: 'POST',
      body: formData,
    })
      // wait for a response from the backend server
      .then((response) => response.json())
      // process the received data with following function
      .then((data) => {
        console.log(data);
        onResponse(data);
      })
      // catch any error
      .catch((error) => console.error(error));
      window.alert('Photo has been sent!');
  }, [webcamRef, setImgSrc, onResponse]);
  
  return (
    // create block with relative position
    <div style={{position: 'relative'}}>
      {/* set the Webcam settings */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        onUserMediaError={() => {
          console.log('failed to access user media');
        }}
        />
      {/* create a button to perform capture photo with the webcam */}
      <button onClick={capture} className="pixel2"
      style={{position: 'absolute', top: '10px', left: '10px'}}>
        Take photo</button>
        <div className='image'>
          {/* {imgSrc && (  
        <img
          src={imgSrc}
        />
      )} */}
        </div>
      
    </div>
  );
};


export default WebcamCapture;