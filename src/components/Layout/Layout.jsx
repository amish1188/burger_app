import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component{

    state = {
        showSideDrawer: false
    }

    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true})
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    render(){
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuth}
                    click={this.sideDrawerOpenHandler}
                />
                <SideDrawer 
                    isAuth={this.props.isAuth}
                    open={this.state.showSideDrawer} 
                    close={this.sideDrawerClosedHandler} 
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
        
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);