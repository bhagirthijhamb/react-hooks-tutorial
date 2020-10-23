import React, { useState, useEffect, useRef } from 'react';
import { useFetchhh } from './useFetch';

// we moved all the code of fetching from the API here in ApiCall component
// because we want to unmount ApiCall component while the data is loading. And then if we try updating state thats what is causing problem.
// We can make it extra sloww with setTimeout() and then we update the state
// Go to useFetch
export const ApiCall = () => {
    // const renders = useRef(0);
    const [countt, setCountt] = useState(0);
    // const [countt, setCountt] = useState(() => JSON.parse(localStorage.getItem('countt')));

    // const [dataa, loadingg] = useFetchh(`http://numbersapi.com/43/trivia`);
    const {dataa, loadingg} = useFetchhh(`http://numbersapi.com/${countt}/trivia`);

    useEffect(() => {
        localStorage.setItem('counttApiCall', JSON.stringify(countt));
    }, [countt]);

    // console.log("ApiCall renders: ", renders.current++ );

    return(
        <div>
            <div>{!dataa ? 'loading...' : dataa}</div>
            <div>count: {countt}</div>
            <button onClick={() => setCountt(c => c + 1)}>Increment</button>
        </div>
    )
}