import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updateObject } from '../../shared/utility';
import { checkValidity } from '../../shared/utility';


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

    componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    

     inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({controls: updatedControls})
     }

     submitHandler = (event) => {
         event.preventDefault();
         this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
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

        let form = formElementsArray.map(formElement => (
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
        ));

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect  to={this.props.authRedirectPath} />
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SIGN UP</Button>
                </form>
                <Button 
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}
                    >SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        )
    }
}

const matStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
 
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(matStateToProps, mapDispatchToProps)(Auth);