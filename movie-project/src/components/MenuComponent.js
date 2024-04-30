import React from "react";
import { Link } from "react-router-dom";
import { NavItem, Navbar, NavbarBrand } from 'reactstrap';


function MenuPage(props) {
    return (
        <Navbar dark>
            <div className="navbar-container">
                <div className="left-links">
                    <Link to="/" className="navbar-link">Movie Aplication</Link>
                </div>
                <div className="right-links">
                    <Link to="/favorites" className="navbar-link">Favorites</Link>
                </div>
            </div>
        </Navbar>
    )
}

export default MenuPage;