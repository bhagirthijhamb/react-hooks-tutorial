import React, { useRef } from 'react';

export const Hi = () => {
    const renders = useRef(0);

    console.log('Hi renders ', renders.current++);
    
    return <div>Hi...</div>
}