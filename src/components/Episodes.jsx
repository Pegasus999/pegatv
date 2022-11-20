import { Dropdown } from "react-bootstrap"
import React from 'react'

export const EpisodesDrop = ( {count, handler})  => {
        function range(start, end) {
            return Array(end).fill().map((_, idx) => start + idx)
        }
        
        var result = range(1, count);
       
      
        return(
        <Dropdown>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">Episodes</Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
                      {result.map((seasons, i)=>(
                        <Dropdown.Item eventKey={i + 1} onClick={()=>{handler(i + 1)}}> Episode {i + 1}</Dropdown.Item>))
                        }           
            </Dropdown.Menu>
        </Dropdown>)
}