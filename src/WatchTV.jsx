
import React, { useEffect, useState } from 'react'
import { Dropdown, Container, Navbar, Ratio,Nav, Alert  } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import * as API from "./secret";
import "./App.css";
import FrameContainer from './FrameContainer';
import DropdownSelect from "./components/selectdropdown";
import {navbuttonM, navbuttonT} from './components/navbutton';
import { brand } from './components/Brand';
import {Link } from 'react-router-dom';
import { EpisodesDrop } from './components/Episodes';


const WatchTV = () => {
    let params = useParams();
    const movieId = params.movieId;
   
    const [genre,setGenre] = useState('movies');
    const [season, setSeason] = useState(1);
    const [e,setE] = useState();
    const [episode, setEpisode] = useState(1);
    const [details, setDetails] = useState([]);
    const [iframe, setIframe] = useState([]);
    const [query,setQuery] = useState();
    const getDetails = async () => {
        const response = await fetch(`${API.URL_TV_DETAILS}/${movieId}?api_key=${API.KEY}`);
        const data = await response.json();
        setE(data.seasons[season].episode_count);
        setDetails(data);
    }
    const handleChange = (value)=>{
    setGenre(value);
    }
    const handleSearchChange = (value)=>{
    setQuery(value);
    }
    const clickhandler =(num)=>{
        setEpisode(num);
    }
    
   const timer = () =>{
    setTimeout(()=>{
        
    },1000)
   }
  useEffect(() => {
    getDetails();
    
    setIframe(`https://www.2embed.to/embed/tmdb/tv?id=${movieId}&s=${season}&e=${episode}`);
  }, [season,episode])


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
                    <FrameContainer url={iframe} />
                </Ratio>
                <div className='sizedBox'></div>
        <div className='sizedBox e'>
                    <a className='epbutton' onClick={() => episode != 1 ? setEpisode(episode-1) : ''}>previous</a>
                <div className='edrop text-center'>
                    <EpisodesDrop count={e} handler={clickhandler} />
                </div>
                    <a  className="epbutton" onClick={() => setEpisode(episode+1)}>Next</a>
                </div>
                <div class="col-md-12 text-center">
                    { details.seasons == null ? 
                    <div></div>
                    :
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">Seasons</Dropdown.Toggle>
                        <Dropdown.Menu variant="dark">
                            {details.seasons.map((seasons, index)=>(
                                <Dropdown.Item eventKey={index + 1} onClick={()=>setSeason(details.seasons[index].season_number)}>Season {details.seasons[index].season_number}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    }
                    
                </div>
                
                  
                 
                
                <Alert variant='info'>
                    <Alert.Heading>Overview</Alert.Heading>
                    {details.overview}
                </Alert>
                <div className='sizedBox'></div>
                </Container>
        </div>
        </body>
    </>
     )
}

export default WatchTV;