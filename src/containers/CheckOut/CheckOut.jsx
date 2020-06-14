import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import ContactData from '../CheckOut/ContactData/ContactData';

class CheckOut extends Component {
    state = { 
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
     }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let param of query.entries()){
            // ['salad','1']
            ingredients[param[0]] = +param[1] //the '+' turns into number
        }
        this.setState({ingredients: ingredients})
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack(); //goes back to the previous page in a history stack
    } 

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data'); 
    }

    render() {
        return (
            <div>
                <CheckOutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCanceled={this.checkoutCanceledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        );
    }
}

export default CheckOut;