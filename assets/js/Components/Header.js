import {NavLink} from "react-router-dom";
import React from "react";


const Header = () => (
    <div className="col-md-3">
        <style>
            @import url('https://fonts.googleapis.com/css?family=Kavoon');
        </style>

        <nav className="navbar navbar-inverse" role="navigation">
            <ul className="nav navbar-nav">

                <NavLink to='/' activeClassName="active"><img
                    src="http://127.0.0.1:8000/static/img/icons/png/liquid-dl.png" id="liquid-dl"/></NavLink>

                <li><NavLink to='/download-manager' activeClassName="active"><i
                    className="fa fa-download nav-icon"/><span
                    className="nav-text"> Download Manager</span></NavLink></li>

                <li><NavLink to='/soundcloud' activeClassName="active"><i className="fa fa-cloud nav-icon"/> <span
                    className="nav-text">Soundcloud</span></NavLink></li>

                <li><NavLink to='/youtube-dl' activeClassName="active" className={"navlink"}><i
                    className="fa fa-youtube-play nav-icon"/><span className="nav-text">  Youtube-dl</span></NavLink>
                </li>

                <li><NavLink to='/wget' activeClassName="active"><i className="fa fa-archive nav-icon"/><span
                    className="nav-text"> Wget</span></NavLink></li>

                <li><NavLink to='/ffmpeg' activeClassName="active"><i className="fa fa-shekel nav-icon"/><span
                    className="nav-text"> FFMPEG</span></NavLink></li>
                <li><NavLink to='/cloudcmd' activeClassName="active"><i className="fa fa-folder nav-icon"/><span
                    className="nav-text"> Cloudcmd</span></NavLink></li>
                <li><NavLink to='/slurp' activeClassName="active" style={{
                    paddingLeft: "15px"
                }}>
                    <svg version="1.1" id="Layer_1" x="0px" y="0px"
                         viewBox="0 0 500 560">
                        <g>
                            <path fill="#fff" d="M243.005,473.667c-77.933,0-141.338-57.157-141.338-127.406c0-65.688,116.273-200.304,129.528-215.436
		c2.854-3.255,7.207-5.158,11.805-5.158c4.599,0,8.952,1.899,11.805,5.158c13.26,15.136,129.528,149.748,129.528,215.436
		C384.338,416.51,320.938,473.667,243.005,473.667z M243.005,161.458c-39.353,47.057-111.248,141.904-111.248,184.803
		c0,55.294,49.904,100.281,111.248,100.281s111.248-44.982,111.248-100.281C354.248,303.362,282.353,208.515,243.005,161.458z"/>
                        </g>
                        <rect id="XMLID_1_" x="203" y="241" fill="none" width="128.667" height="185.988"/>
                        <text id="XMLID_4_" transform="matrix(1 0 0 1 203.0002 393.9987)" fill="#fff"
                              style={{fontFamily: "Kavoon"}} fontSize="170px">F
                        </text>
                    </svg>
                    <span
                        className="nav-text" style={{
                        top: "10px",
                        fontSize: "large",
                        position: "relative",
                        verticalAlign: "top"
                    }}> Fluid</span></NavLink></li>

            </ul>
        </nav>
    </div>
);
export default Header