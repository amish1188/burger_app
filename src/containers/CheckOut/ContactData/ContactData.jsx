import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';

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

     checkValidity = (value, rules) => {
        let isValid = false;
        
        if(!rules){return true}

        if(rules.required){
            isValid = value.trim() !== '';
            
        }
        return isValid;
     }

     inputChangeHandler = (event, id) => {
         const updatedOrderForm = {
             ...this.state.orderForm
         }
         const updatedElement = {
             ...updatedOrderForm[id]
         }
         updatedElement.value = event.target.value;
         updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
         if(updatedElement.required){
             updatedElement.validation.touched = true;
         }
         updatedOrderForm[id] = updatedElement
        

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
            orderData: formData
        }

        this.props.onOrderBurger(order);
        
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
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));