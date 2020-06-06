import React from 'react';

import classes from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            onClick={props.removeIngredientHandler}
            className={classes.Less}
            disabled={props.disabled} //disabled is an html attribute
        >Less</button>
        <button 
            onClick={props.addIngredient} 
            className={classes.More}
        >More</button>
    </div>
);

export default buildControl;