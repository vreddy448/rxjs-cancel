import React from 'react';
import './index.scss';
import logo from "../../logo.svg";

export default class Header extends React.Component {

    render() {
        return(
            <nav className="navbar shadow bg-white justify-content-center">
                <div className="navbar-brand">
                    <img className="d-inline align-middle" src={logo} height={40} width={40} alt="logo"/>
                   React
                </div>
            </nav>
        )
    }
}