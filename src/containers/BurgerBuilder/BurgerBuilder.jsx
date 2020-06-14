import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import axios from '../../axios-orders';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.2,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    //OLDER VERSION OF HAVING CONSTRUCTOR IN CLASS COMPONENT
    // constructor(props){
    //     super(props);
    //     this.state ={}
    // }

    //MODERN VERSION
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('https://react-burger-4ced8.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
    }

    updatePurchase = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        this.setState({totalPrice: updatedPrice, ingredients: updatedIngredients})
        this.updatePurchase(updatedIngredients)
    }
    
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]; // we take value of f.ex. cheese
        if(oldCount<=0){   //operation to return nothing while the considtion is met
            return;
        }
        const updatedCount = oldCount - 1; //cheese gets substracted by one
        const updatedIngredients = { //copy of ingredients object from the state
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; // cheese is updated
        const priceSubstraction = INGREDIENT_PRICES[type]; 
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceSubstraction; //we update price
        this.setState({totalPrice: updatedPrice, ingredients: updatedIngredients});
        this.updatePurchase(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.modalClosed()
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])); //value equals value quantity
        }

        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    modalClosed = () => {
        this.setState({purchasing: false})
    }

    render() {
        const disabledInfo = {...this.state.ingredients}
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0  //salat <= 0?
        }
        // {salad: true, meat:false ...}
        let burger = <Spinner />

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        addIngredient = {this.addIngredientHandler}   
                        removeIngredientHandler = {this.removeIngredientHandler} 
                        disabledInfo={disabledInfo}
                        price={(this.state.totalPrice).toFixed(2)}
                        purchaseable={this.state.purchaseable}
                        order={this.purchaseHandler}
                    />
                </Aux>
            )
        }

        let orderSummary = null;
        if(this.state.ingredients){
            orderSummary = (
                <Aux>
                     <OrderSummary 
                        ingredients={this.state.ingredients} 
                        continue={this.purchaseContinueHandler}
                        cancel={this.purchaseCancelHandler}
                        price={(this.state.totalPrice).toFixed(2)}
                    />
                </Aux>
            )
        }

        return (
  
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.modalClosed}>
                    {!this.state.loading ? orderSummary : <Spinner />} 
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withRouter(withErrorHandler(BurgerBuilder, axios));