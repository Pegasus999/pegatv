
import React, { useEffect, useState } from 'react'
import { Container, Navbar, Ratio,Nav, Form, FormControl, Button, Alert, ButtonGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import * as API from "./secret";
import "./App.css";
import DropdownSelect from "./components/selectdropdown";
import {navbuttonM, navbuttonT} from './components/navbutton';
import { brand } from './components/Brand';
import {Link } from 'react-router-dom';

const WatchMovie = () => {
    let params = useParams();
    const movieId = params.movieId;
    const [query,setQuery] = useState();
    const [genre,setGenre] = useState('movies');
    const [details, setDetails] = useState([]);
    const [iframe, setIframe] = useState([]);

    const getDetails = async () => {
        const response = await fetch(`${API.URL_MOVIE_DETAILS}/${movieId}?api_key=${API.KEY}`);
        const data = await response.json();
        setDetails(data);
    }
    const handleSearchChange = (value)=>{
   setQuery(value);
    }
    const handleChange = (value)=>{
    setGenre(value);
    }
    const mainServer = () => {
         setIframe("https://www.2embed.to/embed/imdb/movie?id="+details.imdb_id);
    }

    const mirrorServer = () => {
        setIframe("https://v2.vidsrc.me/embed/"+details.imdb_id)
    }

  useEffect(() => {
    setIframe("https://www.2embed.to/embed/tmdb/movie?id="+movieId);
    getDetails();
  }, []);


    return (
        <>
        
       <Navbar className='navbar'expand="lg" variant='dark' sticky='top'>
        <Container >
            <Navbar.Brand href="/" as={brand} >PegaTV</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0 "
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="/movies" as={navbuttonM}>Movies</Nav.Link>
                <Nav.Link href="/tv" as={navbuttonT}>TV Shows</Nav.Link>
            </Nav>
            <DropdownSelect handleChange={handleChange}/>
            
                <input
                type="search"
                placeholder="Search"
                className="me-2 searchbar"
                aria-label="Search"
                onChange={e =>{handleSearchChange(e.target.value)}}
                />
               <Link className='searchbutton' to={'/results'} state={{query : query , genre: genre}}>Search</Link>
             

            
            </Navbar.Collapse>
        </Container>
        </Navbar>  
        <body style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${details.backdrop_path}")`,
        }}>
        <div className='movieDetails' style={{
        }}>
            <Container> 
                <div className='sizedBox'></div>
                <h1 className='text-center movie-details-title'>{details.title}</h1>
                <div className='sizedBox'></div>
                <Ratio aspectRatio="16x9">
                    <iframe title={details.title} id="iframe" src={iframe}></iframe>
                </Ratio>
                <div className='sizedBox'></div>
                <div class="col-md-12 text-center">
                <ButtonGroup size='lg'>
                    <Button variant='primary' onClick={mainServer}>Main Server</Button>
                    <Button variant='secondary' onClick={mirrorServer}>Mirror Server</Button>
                </ButtonGroup>
                </div>
                <div className='sizedBox'></div>
                <Alert variant='info'>
                    <Alert.Heading>Overview</Alert.Heading>
                    {details.overview}
                </Alert>
                <Alert variant='success'>
                    <Alert.Heading>Infomation</Alert.Heading>
                    Original title: <b>{details.original_title}</b>
                    <br />
                    Original language: <b>{details.original_language}</b>
                    <br />
                    Release date:  <b>{details.release_date}</b>
                    <br />
                    Runtime: <b>{details.runtime} min</b>
                    <br />
                    Status: <b>{details.status}</b>
                    <br />
                    Vote: <b>{details.vote_average} / 10</b>
                    <br />
                    Homepage: <b>{details.homepage}</b>
                    <br />

                    
                </Alert>
                <div className='sizedBox'></div>
                </Container>
        </div>
        </body>
    </>
     )
}

export default WatchMovie;