import React from 'react';
import './index.scss';

export default class Header extends React.Component {

    render() {
        return(
            <nav className="navbar shadow bg-white justify-content-center">
                <div className="navbar-brand">
                    <img className="d-inline mx-3" src={"https://rxjs-dev.firebaseapp.com/generated/images/marketing/home/Rx_Logo-512-512.png"} height={40} width={40} alt="logo"/>
                   Debounce and Cancel
                </div>
            </nav>
        )
    }
}