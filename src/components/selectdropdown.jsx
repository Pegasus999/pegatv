import React, { useEffect, useState } from 'react'
const DropdownSelect = ({handleChange}) => {

const selectStyle = {
    width:"100px",
    height:"40px",
    borderRadius:"10px",
    marginRight:"10px"
}


    return(
    <>
     <select name='generes' id="generes" className='select'
     onChange={(e) => {
        
        handleChange(e.target.value);}}>
            <option value="movie">Movies</option>
            <option value="tv" >Tv Shows</option>
     </select>
     
    </>
    );
 
}
export default DropdownSelect;