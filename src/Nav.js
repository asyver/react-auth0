import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Nav extends Component {
    render() {
        const { isAuthenticated, login, logout } = this.props.auth;
        return (
            <nav>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <button onClick={isAuthenticated() ? logout : login}>
                                {isAuthenticated() ? "Log Out" : "Log in"}
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
