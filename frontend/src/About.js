import React from 'react';
import { Button } from 'react-bootstrap'; // Importing the Button component from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing the CSS file for the Bootstrap framework
import { Link } from 'react-router-dom'; // Importing the Link component from react-router-dom
import './Home.css'; // Importing the Home component's CSS file
import './About.css'; // Importing the About component's CSS file
import  { useEffect } from 'react'; // Importing the useEffect hook from react

// Defining the About component
const About = () => {

    // Using the useEffect hook to add a fade-in effect to the About content on scroll
    useEffect(() => {
        const aboutContent = document.querySelector('.about-content');
        const fadeInOnScroll = () => {
            const aboutContentTop = aboutContent.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (aboutContentTop < windowHeight * 0.8) {
                aboutContent.classList.add('fade-in');
                window.removeEventListener('scroll', fadeInOnScroll);
            }
        };
        window.addEventListener('scroll', fadeInOnScroll);
        // Cleaning up the scroll event listener on component unmount
        return () => {
            window.removeEventListener('scroll', fadeInOnScroll);
        };
    }, []);

    // The JSX to be rendered
    return (

          
      <div className="about">
                <div>
        <header className="Header">
          <h1 className="Header-title">Rock-Paper-Scissors-Tron PROJECT</h1>
          <div className="Header-buttons">
            <Link to="/Title">
                <button className="pixel"><p>Back</p></button>
            </Link>
            <Link to="/About">
              <button className="pixel"><p>About</p></button>
            </Link>
            <Link to="/">
              <button className="pixel"><p>Mode Selection</p></button>
            </Link>
            <a href="https://ece.ubc.ca/" target="_blank" rel="noopener noreferrer">
              <button className="pixel"><p>UBC ECE</p></button>
            </a>
          </div>
          
        </header>
    
        </div>
        
        <div className="about-content">
          <h2 className="about-heading">What is RPS-TRON?</h2>
          <p className="about-text">
            RPS-TRON is a project built by five students studying Computering Engineering at the University of British Columbia for their design studio course.
          <br></br>
          <br></br>
            The primary functionality of the Robot allows you to play rock paper scissors with the robot. Through the website, you can capture an image of your hand. 
            With machine learning we process the image to determine whether you have chosen Rock, Paper or Scissors. With this information, we can then get the robot to mimic 
            your selected gesture, or for the robot to generate its own move which would allow you to play with the robot. We plan on adding additional functionality such as a 
            machine learning prediction algorithm that would allow the bionic hand to predict your next move.
            <br></br>
            </p>
<p className="about-text">
          Our design encorporates aspects from a variety of different fields of engineering all integrated together to create a functioning Robot:
      
          <br></br>
          </p>
          <p className="about-text"> 
          Hardware wise, we 3D printed the robotic hand with PLA filament. This was then hooked up to five microservos which control the five finger tendons as well
          as a 360 degree servo which controls the wrist movement. All of these components are controlled by our PI 4 microprocessor which also hosts a variety of other features
          such as the website you are currently on!  
            <br></br>
            </p>
            <p className="about-text">
            A main focus of our software was the machine learning algorithm that processes image information into one of rock, paper or scissors.          
            Adding on is this website, which is the user experience component of our project. This website interfaces with a server that is connected 
            to the PI 4 which controls the hardware of the robot.
            </p>
            <br></br>
            <br></br>
        </div>
      </div>
    );
  };
  
  export default About;