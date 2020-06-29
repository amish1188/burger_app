export const updateObject = (oldObject, updated) => {
    return {
        ...oldObject,
        ...updated
    }
};

export const checkValidity = (value, rules) => {
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
 };