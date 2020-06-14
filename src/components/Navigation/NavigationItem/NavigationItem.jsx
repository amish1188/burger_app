import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';


const navigationItem = (props) =>(

    <li className={classes.NavigationItem}>
        <NavLink 
            activeClassName={props.active ? classes.active : null} 
            to={props.link} 
            exact={props.exact}>
                {props.children}
        </NavLink>
    </li>
);

export default navigationItem;