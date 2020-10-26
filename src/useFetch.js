import { useRef, useEffect, useState } from "react"

// it takes a url
export const useFetch = (url) => {
    // whenever this url changes we want to fetch some data, so we add url as a dependency
    useEffect(() => {
        // .then() syntax
        fetch(url)
            .then(x => x.text())
            .then(y => {
                // console.log(y);
            });
                        // we can make a function make it asynchronous and call it like this
                        // const f = async() => {

                        // }
                        // f()

                        // // example
                        // const getData = async() => {
                        //     const request = await fetch('');
                        //     const data = await request.json();
                        //     return data;
                        // }
                        // getData().then(dataReceived => {
                        //     document.getElementById('root').innerText = dataReceived.value;
                        // })
    }, [url])
}

// we can combine useEffect with useState to store some information
// we can use multiple hooks in our custom hook
export const useFetch1 = (url) => {
    const [state, setState] = useState({ data1: null, loading1: true });
    
    useEffect(() => {
        // At the beginning dataa is set to null and loadingg is set to true
        setState(state => ({data1: state.data1, loading1: true}));
        fetch(url)
            .then(x => x.text())
            .then(y => {
                setState({ data1: y, loading1: false});
            });
    }, [url, setState])

    return state;
}


export const useFetchh = (url) => {
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
    }, [url, setState])
    
    // Important things about useFetch
    // if we dont pass the url here [url], then this useFetch will not be called the url changes
    // We can add functions like setState as dependencies and we should be 
    // Make sure your dependencies are not changing based on what the useEffect call is, at least not over an over

    return state;
}

export const useFetchhh = (url) => {
    const isCurrent = useRef(true) // we say by default isCurrent is true
    const [state, setState] = useState({ dataa: null, loadingg: true });

    // and then we say useEffect
    useEffect(() => {
        return () => {
            // called when the component is going to unmount
            isCurrent.current = false; // whenever this value is false we know that the coponent is about to unmount
        }
    }, [])

    useEffect(() => {
        setState(state => ({dataa: state.dataa, loadingg: true}));
        fetch(url)
            .then(x => x.text())
            .then(y => {
                // setState({ dataa: y, loadingg: false});
                if(isCurrent.current){
                    setTimeout(() => {
                        setState({ dataa: y, loadingg: false});
                    }, 2000)
                }
            });
    }, [url, setState])

    return state;
}