import {Link, NavLink} from 'react-router-dom'
import React from 'react';


const Header = () => (
    <div className="col-md-3">


        <nav className="navbar navbar-inverse" role="navigation">
            <ul className="nav navbar-nav">
                <NavLink to='/' activeClassName="active"><h3 className="logo-title">Liquid-DL</h3></NavLink>
                <li><NavLink to='/soundcloud' activeClassName="active"><i className="fa fa-cloud nav-icon"/> <span
                    className="nav-text">Soundcloud</span></NavLink></li>

                <li><NavLink to='/youtube-dl' activeClassName="active" className={"navlink"}><i
                    className="fa fa-youtube-play nav-icon"/><span className="nav-text">  Youtube-dl</span></NavLink></li>

                <li><NavLink to='/wget' activeClassName="active"><i className="fa fa-archive nav-icon"/><span
                    className="nav-text"> Wget</span></NavLink></li>

                <li><NavLink to='/ffmpeg' activeClassName="active"><i className="fa fa-shekel nav-icon"/><span
                    className="nav-text"> FFMPEG</span></NavLink></li>
            </ul>
        </nav>
    </div>
);
export default Header