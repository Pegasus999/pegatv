import { useEffect,useState} from 'react';
import { Col, Row, Container} from 'react-bootstrap';
import MovieCard from './MovieCard';
import * as API from './secret';
import { Navbar,Nav} from 'react-bootstrap';
import "./index.css";
import DropdownSelect from "./components/selectdropdown";
import {Link } from 'react-router-dom';
import {navbuttonM, navbuttonT} from './components/navbutton';
import { brand } from './components/Brand';
const DiscoverMovies = () => {
  const [movies,setMovies] = useState([]);
  const [genre,setGenre] = useState('movie');
  const [query,setQuery] = useState();
  const discoverMovies = async () =>{
    const response = await fetch(`${API.URL_DISCOVER_MOVIES}?api_key=${API.KEY}`);
    const data = await response.json();
    setMovies(data.results);
    
  }
  
  const handleSearchChange = (value)=>{
   setQuery(value);
  }
  const handleChange = (value)=>{
    setGenre(value);
    console.log(value);
  }
  useEffect(() => {
    discoverMovies();

  }, []);
  

  return (
    <div className="App background">
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
     
      <Container >
        <Row xs={1} md={4} className="g-4 my-2">
          {movies.map((_, idx) => (
            <Col>
              <MovieCard movie={movies[idx]}/>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default DiscoverMovies;
