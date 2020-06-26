import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'; 

import Layout from './components/Layout/Layout.jsx';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
    state = {  }
    render() {
        return (
            <Layout>
                <Switch>
                    <Route  path="/" exact component={BurgerBuilder}/>
                    <Route  path="/checkout" component={CheckOut}/>
                    <Route  path="/orders" component={Orders}/>
                    <Route  path="/auth" component={Auth}/>
                    <Route  path="/logout" component={Logout}/>
                </Switch>
            </Layout>
        );
    }
}

export default App;