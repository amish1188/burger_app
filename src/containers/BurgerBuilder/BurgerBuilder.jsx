import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions/actionTypes';
import axios from '../../axios-orders';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';


class BurgerBuilder extends Component {
    //OLDER VERSION OF HAVING CONSTRUCTOR IN CLASS COMPONENT
    // constructor(props){
    //     super(props);
    //     this.state ={}
    // }

    //MODERN VERSION
    state = {
        //ingredients: null, //redux
        //totalPrice: 4,  //redux
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        // console.log(this.props);
        // axios.get('https://react-burger-4ced8.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
    }

    updatePurchase = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.modalClosed()
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    // purchaseContinueHandler = () => {
    //     const queryParams = [];
    //     for(let i in this.state.ingredients){
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])); //value equals value quantity
    //     }

    //     queryParams.push('price=' + this.state.totalPrice);
    //     const queryString = queryParams.join('&');
    //     this.props.history.push({
    //         pathname: '/checkout',
    //         search: '?' + queryString
    //     });
    // }

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

        if(this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        addIngredient = {this.props.onAddIngredient}   
                        removeIngredientHandler = {this.props.onRemoveIngredient} 
                        disabledInfo={disabledInfo}
                        price={(this.props.totalPrice).toFixed(2)}
                        purchaseable={this.updatePurchase(this.props.ingredients)} //call it whenever re-rendered
                        order={this.purchaseHandler}
                    />
                </Aux>
            )
        }

        let orderSummary = null;
        if(this.props.ingredients){
            orderSummary = (
                <Aux>
                     <OrderSummary 
                        ingredients={this.props.ingredients} 
                        continue={this.purchaseContinueHandler}
                        cancel={this.purchaseCancelHandler}
                        price={(this.props.totalPrice).toFixed(2)}
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
        const mapStateToProps = state => {
            return {
                ingredients: state.ingredients,
                totalPrice: state.totalPrice
            }
        }

    const mapDispatchToProps = dispatch => {
        return {
            onAddIngredient: (ingredientType) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientType: ingredientType}),
            onRemoveIngredient: (ingredientType) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientType: ingredientType})
        }
    }


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withErrorHandler(BurgerBuilder, axios)));