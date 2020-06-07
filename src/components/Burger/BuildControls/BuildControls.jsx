import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price} $</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                addIngredient={() => props.addIngredient(ctrl.type)}
                removeIngredientHandler={() => props.removeIngredientHandler(ctrl.type)}
                disabled={props.disabledInfo[ctrl.type]}
            />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchaseable}>ORDER NOW</button>
    </div>
)

export default buildControls;