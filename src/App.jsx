import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'; 

import Layout from './components/Layout/Layout.jsx';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';

class App extends Component {
    state = {  }
    render() {
        return (
            <Layout>
                <Switch>
                    <Route  path="/" exact component={BurgerBuilder}/>
                    <Route  path="/checkout" component={CheckOut}/>
                </Switch>
            </Layout>
        );
    }
}

export default App;