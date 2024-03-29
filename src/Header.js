import React from 'react';

import useWindowSize from './hook/useWindowSize'
import {FaLaptop, FaMobileAlt} from "react-icons/fa";
import DataContext from './context/DataContext';


const Header = ({title}) => {
  let {width} =useWindowSize(DataContext)
  

  return (
    <div className='Header'>
        <h1>{title}</h1>
        {
          width<700?    <FaMobileAlt/>  : <FaLaptop/>
        }
    </div>
  )
}

export default Header