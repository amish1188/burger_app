import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state = { 
        name: "",
        email: "",
        address: {
            street: "",
            postCode: ""
        }
     }
    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Entry your contact data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your name"/>
                    <input type="text" name="email" placeholder="Your email"/>
                    <input type="text" name="street" placeholder="Your street"/>
                    <input type="text" name="postCode" placeholder="Your post code"/>
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;