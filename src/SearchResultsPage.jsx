import { useEffect,useState} from 'react';
import { Navbar,Nav, Form, FormControl, Button} from 'react-bootstrap';
import { Col, Row, Container} from 'react-bootstrap';
import MovieCard from './MovieCard';
import * as API from './secret';
import "./index.css";
import { useLocation, Link } from 'react-router-dom';
import DropdownSelect from "./components/selectdropdown";
import {navbuttonM, navbuttonT} from './components/navbutton';
import { brand } from './components/Brand';

const ResultPage = ()=>{
const location = useLocation();
const { query, genre} = location.state;
const [Query,setQuery]= useState();
const [type,setType] = useState('movie');
const [movies,setMovies] = useState([]);

const discoverResults = async () =>{
    const response = await fetch(`${API.URL_SEARCH}${genre}?api_key=${API.KEY}&query=${query}`);
    const data = await response.json();
    setMovies(data.results);
  }
const handleSearchChange = (value)=>{
   setQuery(value);
}
const handleChange = (value)=>{
    setType(value);
    console.log(value);
  }
useEffect(()=>{
 discoverResults() ;
})


    return(<div className="App background">
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
        
      <Container>
        <Row xs={1} md={4} className="g-4 my-2">
          {movies.map((_, idx) => (
            <Col>
              <MovieCard movie={movies[idx]}/>
            </Col>
          ))}
        </Row>
      </Container>
    </div>)
}
export default ResultPage