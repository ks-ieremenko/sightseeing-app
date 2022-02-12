import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavbarDark.module.css';
import img from './img/delphinium.svg';
const NavbarDark = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };
    const classCollapsed = collapsed
        ? 'collapse navbar-collapse'
        : 'collapse navbar-collapse show';
    const classTwo = collapsed
        ? 'navbar-toggler navbar-toggler-right collapsed'
        : 'navbar-toggler navbar-toggler-right';
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <NavLink to="/" className="navbar-brand" exact>
                <img className={styles.img} src={img} />
            </NavLink>
            <button
                style={{ outline: 0 }}
                onClick={toggleNavbar}
                className={classTwo}
                type="button"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                {/* <span>{collapsed ? <MenuIcon /> : <MenuOpenIcon />}</span> */}
            </button>
            <div className={classCollapsed} id="navbarNav">
                <div className="navbar-nav">
                    <NavLink className="nav-link" to="/" exact>
                        Home
                    </NavLink>
                    <NavLink className="nav-link" to="/profile" exact>
                        Profile
                    </NavLink>
                </div>
                <div className="navbar-nav ml-auto">
                    <NavLink className="nav-link" to="/signup" exact>
                        SignUp
                    </NavLink>
                    <NavLink className="nav-link" to="/signin" exact>
                        SignIn
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default NavbarDark;
