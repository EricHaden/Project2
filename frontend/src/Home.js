import React from 'react'; // Importing the React library
import { Button } from 'react-bootstrap'; // Importing the Button component from the React Bootstrap library
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing the Bootstrap CSS file
import { Link } from 'react-router-dom'; // Importing the Link component from the React Router library
import './Home.css' // Importing the Home.css file

const Home = () => { // Defining a functional component named Home

      const select_god = React.useCallback(() => { // Defining a function named select_god using the React useCallback hook
        console.log("posting"); // Logging a message to the console
        let mode = 'god'; // Creating a variable named mode and setting its value to 'god'
        const url = 'http://172.28.90.45:8080/mode'; // Creating a variable named url and setting its value to the API endpoint URL
        const formData = new FormData(); // Creating a new instance of the FormData object

        formData.append('mode', mode); // Adding the mode variable to the form data

        fetch(url, { // Making a fetch request to the API endpoint URL
          method: 'POST', // Using the POST method
          body: formData, // Adding the form data to the request body
        })
          .then((response) => response.json()) // Parsing the response as JSON
          .then((data) => console.log(data)) // Logging the parsed data to the console
          .catch((error) => console.error(error)); // Logging any errors to the console
      });

      const select_normal = React.useCallback(() => { // Defining a function named select_normal using the React useCallback hook
        console.log("posting"); // Logging a message to the console
        let mode = 'normal'; // Creating a variable named mode and setting its value to 'normal'
        const url = 'http://172.28.90.45:8080/mode'; // Creating a variable named url and setting its value to the API endpoint URL
        const formData = new FormData(); // Creating a new instance of the FormData object

        formData.append('mode', mode); // Adding the mode variable to the form data

        fetch(url, { // Making a fetch request to the API endpoint URL
          method: 'POST', // Using the POST method
          body: formData, // Adding the form data to the request body
        })
          .then((response) => response.json()) // Parsing the response as JSON
          .then((data) => console.log(data)) // Logging the parsed data to the console
          .catch((error) => console.error(error)); // Logging any errors to the console
      });

    return ( // Returning the JSX code to be rendered
      <div>
        
      <div className="mode_selection">
        <div className='button-container'>
          Select Mode
        <Link to="/Title">
            <div class="pixel2" onClick={select_normal} style={{fontSize: '40px'}}><p>Normal</p></div>
        </Link>
        <Link to="/Title">
          <div class="pixel2" onClick={select_god} style={{fontSize: '40px'}}><p>Competitive</p></div>
        </Link>
        </div>
      </div>
  </div>
    );
  }

  export default Home
  