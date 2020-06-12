import React, { Component } from 'react';

import Layout from './components/Layout/Layout.jsx';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';

class App extends Component {
    state = {  }
    render() {
        return (
            <Layout>
                <BurgerBuilder />
                <CheckOut />
            </Layout>
        );
    }
}

export default App;