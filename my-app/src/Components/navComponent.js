import React from 'react';
import CreateForm from './createComponent';

const Navbar = () => {
    return(
        <header className='header'>
            <a className='title'>RestAPI Project</a>
            <nav className='navbar'>
                <a >Create</a>
                <a >Delete</a>
                <a >Find</a>
                <a >Download</a>
                <a >View</a>
            </nav>
        </header>
    )
}

export default Navbar;