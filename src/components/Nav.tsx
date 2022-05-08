import {Component, PureComponent} from "react";
import {Link, NavLink} from "react-router-dom";
import {Tab, Tabs} from "@material-ui/core";

class Nav extends PureComponent<any, any> {
    render() {
        return (
            <nav className='navtop'>
                <h2>Travel Club</h2>
                <ul className='nav-links'>
                    <li><NavLink to='/'>Main</NavLink></li>
                    <li><NavLink to='/club'>Club</NavLink></li>
                    <li><NavLink to='/member'>Member</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default Nav;