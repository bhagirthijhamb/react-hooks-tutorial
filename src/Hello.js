import React from 'react';

export const Hello = () => {
    React.useEffect(() => {
        // console.log("render from Hello");

        return () => {
            // console.log("unmount from Hello");
        };
    }, []);

    return <div>hello</div>
}