import React from "react";
import {Link, useNavigate} from  'react-router-dom';

const Navbar = () => {
    const redirect = useNavigate();

    return (
        <div className="navbar">
        <div className="navbar__links">
          <Link to="/">About</Link>
          <Link to="posts">Posts</Link>
          <button onClick={()=>{redirect('/')}}>change about</button>
        </div>
      </div>
    )
};

export default Navbar;