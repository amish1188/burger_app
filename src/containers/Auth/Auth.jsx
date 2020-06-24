import React, {Component} from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    valid: false,
                    touched: false
                }
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type:'password',
                    placeholder:'Your password'
                },
                validation: {
                    required: true,
                    valid: false,
                    touched: false
                }
            }
        },
        isSignup: true
    }

    checkValidity = (value, rules) => {
        let isValid = false;
        
        if(!rules){return true}

        if(rules.required){
            isValid = value.trim() !== '';
        }
        if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
     }

     inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls})
     }

     submitHandler = (event) => {
         event.preventDefault();
         this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
     }

     switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
     }

    render() {
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form = formElementsArray.map(formElement => (
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
        ))

        return(
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SIGN UP</Button>
                </form>
                <Button>SIGN IN</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),

    }
}

export default connect(null, mapDispatchToProps)(Auth);