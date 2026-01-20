import React from "react";
import Header from "../Layout/Header.jsx";  
import Footer from "../Layout/Footer.jsx";

function About (){
    return(
        <div>
            <Header/>
            <h1>About Us</h1>
            <p>This is the About page of our application.</p>
            <Footer/>
        </div>
    )
}
export default About;