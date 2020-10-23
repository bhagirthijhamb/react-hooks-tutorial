import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { useForm } from "./useForm";
import { Hello } from './Hello';
import { useFetch, useFetchh } from './useFetch';

function expensiveInititalState(){
  // for loop etc
  return 10;
}

function App() {
  // ***************************************************************************************************
  //            useState Hook
  // ***************************************************************************************************

  // This way it is called only first time, not every single time the component renders.
  // Only have this run on the initial value
  useState(() => expensiveInititalState());
  // useState returns an array. // const arr = useState(). But no body write like this instead destructures it
  const [count, setCount] = useState(10);

  // ---------------------------
  const [{number1, number2}, setNumber] = useState({number1: 10, number2: 20})
  // --------------------------
  const [num1, setNum1] = useState(8);
  const [num2, setNum2] = useState(9);
  // -------------------------
  // Forms
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // use useForm hook
  const [values, handleChange] = useForm({email: "", password: "", firstName: ""})

  // ***************************************************************************************************
  //            useEffect Hook
  // ***************************************************************************************************

  // Every time a component is rendered or it rerenders, the callback function inside the useEffect hook is called
    useEffect(() => {
      // console.log('render')
      // when we type in the input box, the component rerenders and we see 'render' printed in the console.
    })
  // Everything else we do is for the callback function to be called less and 
  // If we dont want the function to be called on every render but only when we change the password.
  // We can do this by passing another argument to the useEffect as an array
  // the second paranter is caled dependency array that we can pass in. Here we can pass all the values that our useEffect depends on. These values when they change, the callback function fires off again.
  useEffect(() => {
    console.log('Second render')
    // when we type in the email input box, the component rerenders and we see 'render' printed in the console.
  }, [values.email, values.password])
  // This does a shallow comparison of the values, whenever the values change the function is called.
  // Shallow comparison means if we put an object [values] the object is going to change on every single change or a new object is going to be created so the function is gona be called every single time.

  // We can replace componentDidMount and componentWillUnmount with useEffect hook
    useEffect(() => {
      console.log('print once')
      // Will log just once during first render of component when it mounts, that it. Doing renrenders in not gonna call the function there
    }, []) 

    // we can do a cleanup function which means we can return a function from inside the function inside of useEffect(). The returned function is called the cleanup function and we can add the cleanup logic here.
    useEffect(() => {
      console.log('print once')
      
      return () => {
        console.log('unmount')
        // we see this when the component disappears(for a fraction of a second)
      }
    }, [])

    const [showHello, setShowHello] = useState(true);
    // So we can see the component mounting and unmounting here

    // the cool thing is that it doesnt have to be when the component mounts ans unmounts
    // lets say we want to fire off when the value of email input chnages
    // So whenever the value in the email input chnages, its gonna call the cleanup function.
    // First we see 'unmount...' and then 'mount...' because first it cleans up the old value and then we have 'mount...' for new value. (its not mounting or unmounting here. we can do this whenever the dependencies change)
    useEffect(() => {
      console.log('mount...')
      
      return () => {
        console.log('unmount...')
      }
    }, [values.email])

    // preactical example of this
    // useEffect is a great place to add event listeners
    useEffect(() => {
      // when this mounts, we want to listen to the mousemove and display the current location of the mouse
      const onMouseMove = e => {
        // console.log(e)
      }
      window.addEventListener('mousemove', onMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
      }
    }, [])

    // We can ahve more than one useEffect in a component ans they fire off in order

  //---------------

  // create useFetch.js hook

  // call useFetch hook now
  useFetch('http://numbersapi.com/43/trivia')
  // lets make this more useful. i want this to return to me the data and true or false whether the data is loading or not (whether there is anything in the data)
  // How do we do this. Go to useFetch hook
  const {data, loading} = useFetchh('http://numbersapi.com/43/trivia')
  
  // next we want the data to change whenever the url changes
  // so we can set a counter
  // const [countt, setCountt] = useState(0);
  const [countt, setCountt] = useState(() => JSON.parse(localStorage.getItem('countt')));
  const {dataa, loadingg} = useFetchh(`http://numbersapi.com/${countt}/trivia`)

  // ------------------------------
  // saving the state- if we want to save this to local storage, we can make a useEffect hook here. And say we want to persist the value of countt 
  // I want the function onside useEffect to be called everytime the countt changes
  // so everytime the count chnages its going to set the countt in local storage
  // we dont want JSON.parse() to be called on every single render, so we use initialiser funciton of useState
  // So evrytime we increment its setting the count in the localStorage and everytime we reset/refresh its reading from the local storage
  useEffect(() => {
    localStorage.setItem('countt', JSON.stringify(countt));
  }, [countt])


  // ***************************************************************************************************
  //            useRef Hook
  // ***************************************************************************************************

  // fuse case - for storing a reference to a component say input field or div and then being able to reference that not in your application
  // so we will make a button and whenever we click that button it will focus the input field. So we will get reference to them

  const inputRef = useRef();
  // we can pass this to what ever we want to get reference of (first email input here)
  // So we have a reference to the input field now. So we console.log(inputRef.current) and we have refernce to the input DOM node and we can do what ever we want. Like call any methods on there or read the values of the stuff
  // we say inputRef.current.focus()

  return (
    <div className="App">
      <p>Count: {count}</p>
      {/* Calling setCount on buttonclick */}
      <button onClick={() => setCount(count+1)}>Count +</button>
      {/* Similar to setState() we can pass a function to setCount() */}
      <button onClick={() => setCount(currentCount => currentCount - 1)}>Count -</button>
      {/* --------------------------- */}
      <hr/>
      <p>Number1: {number1}</p>
      <p>Number2: {number2}</p>
      {/* spread the current state (to retain other parts of the state) and then make changes to parts of the state */}
      <button onClick={() => setNumber(currentState => ({...currentState, number1: currentState.number1 + 1}))}>Number +</button>
      <br/>
      <p></p>
      <button onClick={() => setNumber(currentState => ({...currentState, number1: currentState.number1 + 1, number2: currentState.number2 + 5}))}>Both Number +</button>
      {/* ------------------------------- */}
      <hr/>
      <p>Num1: {num1}</p>
      <p>Num2: {num2}</p>
      {/* Below will change just num1, won't change num2 */}
      <button onClick={() => setNum1(n => n+1)}>Num1 +</button> 
      <br/>
      <p></p>
      {/* To increment both of them */}
      <button onClick={() => {
          setNum1(n => n+1);
          setNum2(n => n+2)
          }}
      >Both Nums +</button> 
      <br/>
      <hr/>
      {/* ------------ Forms ----------------- */}
      
      <input ref={inputRef} type="email" placeholder="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
      <br/>
      <hr/>
      <input type="email" placeholder="email" name="email" value={values.email} onChange={handleChange} />
      <input type="password" placeholder="password" name="password" value={values.password} onChange={handleChange} />
      <input type="text" placeholder="first name" name="first name" value={values.firstName} onChange={handleChange} />

      {/* We can generate a custom hook for the form elements here
        - In useForm.js */}
  {/* ************************************************************************************** */}
      <br/><hr/>
      <button onClick={() => setShowHello(!showHello)}>toggle</button>
      {showHello && <Hello />}

      <br/><hr/>

      {/* -----useFetch------------ */}
      {/* <div>{loadingg ? 'loading...' : dataa}</div> */}
      <div>{!dataa ? 'loading...' : dataa}</div>
      <div>count: {countt}</div>
      <button onClick={() => setCountt(c => c + 1)}>increment</button>

  {/* **************************************************************************************** */}
    <br/><hr/>
  <button onClick={() => {
    console.log(inputRef.current);
    inputRef.current.focus();
  }}>Focus</button>


    </div>
  );
}

export default App;
