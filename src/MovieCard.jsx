import React from 'react'
import { Card, Badge } from 'react-bootstrap';
import "./index.css";
const style = {
  border:"2px solid #0d1f2d",
  borderRadius:'2px',
  backgroundColor:"0d1f2d",
  
}
const MovieCard = ({movie}) => {
    return (
      <Card className="h-100" style={style} >
        <Card.Link href={ (movie.adult != null ? "/movies/" : "/tv/") + movie.id }>
            <Card.Img variant="top" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
        </Card.Link>
        <Card.Body className='cardbody'>
        <Card.Title className='title'>{movie.adult != null ? movie.title : movie.name}  <Badge bg='warning' text='dark'>{movie.vote_average} ★</Badge></Card.Title>
          <Card.Text>
           {/* {movie.overview} */}
          </Card.Text>
        </Card.Body>
      </Card>
    )
}

export default MovieCard;