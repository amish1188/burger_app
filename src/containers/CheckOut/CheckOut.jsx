import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import ContactData from '../CheckOut/ContactData/ContactData';

class CheckOut extends Component {
    
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
                    ingredients={this.props.ingredients}
                    onCheckoutCanceled={this.checkoutCanceledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps)(CheckOut);