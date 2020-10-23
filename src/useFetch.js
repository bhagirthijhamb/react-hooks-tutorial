import { cloneElement, useEffect, useState } from "react"

export const useFetch = (url) => {
    // whenever this url changes we want to fetch some data
    useEffect(() => {
        // .then() syntax
        fetch(url)
            .then(x => x.text())
            .then(y => {
                console.log(y);
            });
        // we can make a function and call it like this
        // const f = async() => {

        // }
        // f()
    }, [url])
}

// we url as a dependency as tne second argument to useEffect [url]

// we can combine useEffect with useState to store some information
// we can use multiple hooks in our custom hook

export const useFetchh = (url) => {
    // whenever this url changes we want to fetch some data
    const [state, setState] = useState({ dataa: null, loadingg: true });

    useEffect(() => {
        // it resets the data every time here 
        // setState({dataa: null, loadingg: true});
        setState(state => ({dataa: state.dataa, loadingg: true}));
        fetch(url)
            .then(x => x.text())
            .then(y => {
                setState({ dataa: y, loadingg: false});
            });
        // we can make a function and call it like this
        // const f = async() => {

        // }
        // f()
    }, [url, setState])
    // Important things about useFetch
    // if we dont pass the url here [url], then this useFetch will not be called the url changes
    // We can add functions like setState as dependencies and we should be 
    // Make sure your dependencies are not changing based on what the useEffect call is, at least not over an over

    return state;
}