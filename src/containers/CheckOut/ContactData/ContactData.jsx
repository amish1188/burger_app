import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject } from '../../../shared/utility';
import { checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = { 
        formIsValid: false,
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeholder:'Your name'
                    },
                    value: '',
                    validation: {
                        required: true,
                        valid: false,
                        touched: false
                    }
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeholder:'Your address'
                    },
                    value: '',
                    validation: {
                        required: true,
                        valid: false,
                        touched: false
                    }
                },
                postCode: {
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeholder:'Your post code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        valid: false,
                        touched: false
                    }
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type:'email',
                        placeholder:'Your email'
                    },
                    value: '',
                    validation: {
                        required: true,
                        valid: false,
                        touched: false
                    }
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'normal', displayValue: 'Normal'},
                        ]
                    },
                    value: 'fastest',
                    valid: true
                }
            }
        
     }

     inputChangeHandler = (event, id) => {
         const updatedElement = updateObject(this.state.orderForm[id], {
             value: event.target.value,
             valid: checkValidity(event.target.value, this.state.orderForm[id].validation),
             touched: true
         })
        
         const updatedOrderForm = updateObject(this.state.orderForm, {
             [id]: updatedElement
         })
        

         let formIsValid = true;
         for(let inputIdentifier in updatedOrderForm){
             formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
         }
         console.log(updatedOrderForm);
         this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid}) //, formIsValid: formIsValid
        
     } 

     orderHandler = (event) => {
        event.preventDefault(); //form reloads the page by default so we have to prevent it
        const formData = {};
        for(let formIdentifier in this.state.orderForm){
            formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
        } 

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(this.props.token, order);
        
     }

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
           
                formElementsArray.push({
                    id: key,
                    config: this.state.orderForm[key]
                })
            
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement =>(
                    
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            shouldValidate={formElement.config.validation}
                            changed={(event) => this.inputChangeHandler(event, formElement.id)}
                        />
                    
                ))}
                <Button  btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Entry your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (token, orderData) => dispatch(actions.purchaseBurger(token, orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));