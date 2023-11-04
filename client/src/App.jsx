import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from '/src/Signup'
import Movies from '/src/Pages/Movies';
import MovieDetails from '/src/Pages/Moviedetails'
import User from '/src/Pages/User';
import Home from '/src/Pages/Home';
import Header from '/src/UI_components/navbar/Navbar'
import { UserProvider } from './UserContext';

import {Route, Routes, Router, Navigate} from "react-router-dom";



function App() {

  const [user, setUser] = useState('')

  return (
    <>
      <UserProvider>
        <Header user={user}/>
          <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path='/signup' element={<Signup userToDisplay={setUser}/>}/>
                <Route exact path="/movies" element={<Movies />} />
                <Route exact path="/user" element={<User />} />
                <Route path="/movie/:movieId" element={<MovieDetails />} />

          </Routes>
      </UserProvider>    
    </>
  );
}

export default App;

