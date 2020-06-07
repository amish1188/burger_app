import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>{igKey.toUpperCase()}: {props.ingredients[igKey]}</li>
        })
    return(
        <Aux>
            <h3>Your Order  {props.price} $</h3>
            <p>A delicious order</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;