import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = ( props ) => {

    //CREATING ARRAY OUT OF OBJECT
    let transformedIngredients = Object.keys(props.ingredients) // [salad, bacon, cheese, meat]
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                //[[salad0], [bacon0], [cheese0, cheese1], [meat0,meat1]]
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        }) 
        // FLATENNING THE ARRAY WITH reduce() TO CHECK THE LENGTH OF VALUES,s NOT EMPTY ARRAYS
        .reduce((arr, el) => {
            return arr.concat(el) 
        }, []);
    if(transformedIngredients.length===0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger;
