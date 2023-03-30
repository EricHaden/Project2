
import React from 'react';
import Webcam from 'react-webcam';
import './Title.css';

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    // Create a FormData object and append the captured image to it
    const formData = new FormData();
    formData.append('image', imageSrc);
    console.log("made it to fetch req");
    // Send a POST request to the server to upload the image
    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, [webcamRef, setImgSrc]);
  
  return (
    <div style={{position: 'relative'}}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        />
      <button onClick={capture} className="Header-button"
      style={{position: 'absolute', top: '10px', left: '10px'}}>
        Capture photo</button>
      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
    </div>
  );
};


export default WebcamCapture;
