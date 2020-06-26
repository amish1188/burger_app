import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const navigationItems =(props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact active>Burger Builder</NavigationItem>
        {props.isAuth ? <NavigationItem link="/orders" active>Orders</NavigationItem> : null }
        { props.isAuth 
            ? <NavigationItem link="/logout" active>Logout</NavigationItem>
            : <NavigationItem link="/auth" active>Log in</NavigationItem> 
             }
    </ul>
);

export default navigationItems;