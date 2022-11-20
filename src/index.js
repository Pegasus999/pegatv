import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes ,Navigate } from 'react-router-dom';
import DiscoverMovies from './DiscoverMovies';
import WatchMovie from './WatchMovie';
import WatchTV from './WatchTV';
import DiscoverTV from './DiscoverTV';
import ResultPage from './SearchResultsPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/movies"/>}/>   
      <Route path="/movies/:movieId" element={<WatchMovie />} />
      <Route path="/movies" element={<DiscoverMovies />} />
      <Route path="/tv/:movieId/:season/:episode" element={<WatchTV/>} />
      <Route path="/tv/:movieId" element={<WatchTV/>} />
      <Route path="/tv" element={<DiscoverTV />} />
      <Route path="/results" element={<ResultPage/>} />
    </Routes>
  </BrowserRouter>,
);