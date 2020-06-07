import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false
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

    render() {
        const disabledInfo = {...this.state.ingredients}
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0  //salat <= 0?
        }
        // {salad: true, meat:false ...}
        
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    addIngredient = {this.addIngredientHandler}   
                    removeIngredientHandler = {this.removeIngredientHandler} 
                    disabledInfo={disabledInfo}
                    price={(this.state.totalPrice).toFixed(2)}
                    purchaseable={this.state.purchaseable}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;