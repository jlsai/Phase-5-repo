import React, { useState, useEffect } from 'react';
import MovieCarousel from '/src/Movie_actions/MovieCarousel.jsx';
import BlogSection from '/src/UI_components/Blogs.jsx';
import spartan from '/src/assets/spartan.png'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '/src/Pages/Home.css';

const api_key = 'c9ec267ab1d062779039d92435621a6b';

function Homepage() {
  return (
    <div className='container'>
      <div className="overlay">
        <h1>Log your favorite movies!</h1>
        <h1>Share the greats with your friends!</h1>
      </div>
      <div className="relative">
        <img className="image-container w-full h-auto object-cover absolute inset-0 bg-gradient-to-br from-transparent to-black bg-opacity-50" src={spartan} alt="Spartan" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black bg-opacity-50"></div>
      </div>
      <div>
        <Link to="/signup">
          <button className="blue-button">Get started now!</button>
        </Link>
      </div>
      <div className='movies'>
        <MovieCarousel />
      <div className="divider"></div>
      </div>
      <BlogSection />
    </div>
  );
}


export default Homepage;
