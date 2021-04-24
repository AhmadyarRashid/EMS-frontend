import React from 'react'
import {Link} from "react-router-dom";

function Header() {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/disclaimer">Disclaimer</Link>
    </>
  )
}

export default Header
