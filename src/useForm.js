import { useState } from 'react';

export const useForm = (initialValues) => {
    // we can put stuff inside here eg hooks
    const [values, setValues] = useState(initialValues);

    // we can return stuff from my custom hooks. We can return an object or an arrray here (and patch the syntax of useState()). 
    // First we return values and an onChange function (that we can get handle for us)
    return [values, e => {
        setValues({
            ...values,
            // based on the name of the input field, we update the value of that value in the form
            [e.target.name]: e.target.value
        })
    }]
}

// We are able to encapsulate that logic inside of this little function that I made here.
// Now I can use this function, or use my hook in other components.
// It has no UI associated to it. All it has is the logic (the logic of how we want to store the state.)