import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { useForm } from "./useForm";
import { Hello } from './Hello';
import { Hi } from './Hi';
import { ApiCall } from './ApiCall';
import { useFetch, useFetch1, useFetchh } from './useFetch';

function expensiveInititalState(){
  // for loop etc
  return 10;
}

function App() {
  // Do not call Hooks inside loops, conditions or nested functions
  // ***************************************************************************************************
  //            useState Hook
  // ***************************************************************************************************

  // useState() is used to define state. It can have as its first parameter the initial value that it is gonna store. 
  // eg. useState(10)
  // or we can have a function that returns the initial value - useState(() => 10). We would want to do this if we have a computation that is very expensive.

  // This way it is called only first time, not every single time the component renders.
  // Only have this run on the initial value
  useState(() => expensiveInititalState());

  // useState returns an array. // const arr = useState(). But nobody write it like this, instead destructures the array like this.
  const [count, setCount] = useState(10);
  // we render the count and we have buttons that increment and decrement the count

  // ---------------------------------------------------

  // we can store anything in useState(). Here we are storing an object. And then we are destructuring that object and grabbing the numbers (number1 and number2)
  // Lets say we want to increment the number here but we only want to increment the number2

  const [{number1, number2}, setNumber] = useState({number1: 10, number2: 20})
  // ----------------------------------------------------

  const [num1, setNum1] = useState(8);
  const [num2, setNum2] = useState(9);

  // ----------------------------------------------------
  // How are the useState hooks useful - comes to defining your own custom logic and being able to extract this logic in the hook and use it all over the place
  // Forms
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // How can we do this in a better way
  // We can extract these above hooks into owr own custom hooks which handles the state for us
  // Create useForm hook in useForm.js file
  // use the useForm hook here
  const [values, handleChange] = useForm({email: "", password: "", firstName: ""})

  // ***************************************************************************************************
  //            useEffect Hook
  // ***************************************************************************************************

  // Every time a component is rendered or it rerenders, the callback function inside the useEffect hook is called
    useEffect(() => {
      // console.log('render')
      // when we type in the input box, the component rerenders with each word typed and we see 'render' printed in the console.
    })
  // Everything else we do after this is for the callback function to be called less and to clean up after the render has happened.
  // If we want the function to be called less and. eg we dont want the function to be called on every render but only when we change the password.
  // We can do this by passing another argument to the useEffect as an array
  // the second paranter is caled dependency array that we can pass in. Here we can pass in all the values that our useEffect depends on. These values when they change, the callback function fires off again.
  useEffect(() => {
    console.log('Second render')
    // when we type in the password input box, the component rerenders and we see 'render' printed in the console.
  }, [values.password])
  
  // We can put more than one value here. eg if e have another field firstname.
  useEffect(() => {
    console.log('Third render');
  }, [values.email, values.password]);
  // SO now my useEffect depends on email and password but not the firstname
  // This does a shallow comparison of the values, whenever the values change the function is called.
  // Shallow comparison means if we put an object [values] the object is going to change on every single change or a new object is going to be created so the function is gona be called every single time.

  //---------------------------------------------------------------
  // We can replace componentDidMount and componentWillUnmount with useEffect hook
    useEffect(() => {
      console.log('print once')
      // Will log just once during first render of component when it mounts, that it. Doing renrenders in not gonna call the function there (try typing in the input boxes, it will not type in the console.)
    }, []) 

    // we can do a cleanup function which means we can return that function from the inside of the function inside of useEffect(). The returned function is called the cleanup function and we can add the cleanup logic here.
    useEffect(() => {
      console.log('print once')
      
      return () => {
        console.log('unmount')
        // we see this when the component disappears(for a fraction of a second)
      }
    }, [])

    // We can create another component Hello.js. Here if we toogle it, if we show it and then dont show it,it will mount and unmount each time
    // by default we will show it
    const [showHello, setShowHello] = useState(true);
    // So we can see the component mounting and unmounting here

    //-----------------------------------------------------------------------
    // the cool thing is that it doesnt have to be when the component mounts ans unmounts
    // lets say we want to fire off when the value of email input changes
    // So whenever the value in the email input chnages, its gonna call the cleanup function.
    // So when we type a letter in the email input, we see unmount, we are unmounting we are just cleaning up the old value and we have a new value(letter) here.
    // First we see 'unmount...' and then 'mount...' because first it cleans up the old value and then we have 'mount...' for new value. (its not mounting or unmounting here. we can do this whenever the dependencies change)
    useEffect(() => {
      console.log('mount...')
      
      return () => {
        console.log('unmount...')
      }
    }, [values.email])
    
    //-----------------------------------------------------------------------
    // Usecases example of this - EVENTS 
    // useEffect is a great place to add event listeners

    // We may want to add event listener. When this mounts I want to listen to the mouse and just display the current location of the mouse
    useEffect(() => {
      // when this mounts, we want to listen to the mousemove and display the current location of the mous
      const onMouseMove = e => {
        // console.log(e)
      }
      window.addEventListener('mousemove', onMouseMove);
      
      // we want to clean up this function when i am done
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
      }
    }, [])

    // We can have more than one useEffect in a component ans they fire off in order

  //---------------------------------------------------------------------------
  // Fetch from an API
  // create a custom hook useFetch.js hook

  // call useFetch hook now, it logs the fact about number 43 to the console.
  useFetch('http://numbersapi.com/43/trivia');
  
  // lets make this more useful. i want this to return to me the data and loading (true/false whether the data is loading or not (whether there is anything in the data))
  // How do we do this. We can combine the useFetch hook with useState hook (go to useFetch.js)
  const {data1, loading1} = useFetch1('http://numbersapi.com/43/trivia')
  
  // next we want the data to change whenever the url changes
  // so we can add a little counter

  // const [countt, setCountt] = useState(0);
  const [countt, setCountt] = useState(() => JSON.parse(localStorage.getItem('countt')));
  const {dataa, loadingg} = useFetchh(`http://numbersapi.com/${countt}/trivia`)

  // ------------------------------
  // saving the state- if we want to save this to local storage, we can make a useEffect hook here. And say we want to persist the value of countt 
  // I want the function inside useEffect to be called everytime the countt changes
  // so everytime the count chnages its going to set the countt in local storage
  // We can now change the initial value of the count -   const [countt, setCountt] = useState(() => JSON.parse(localStorage.getItem('countt')));
  // we dont want JSON.parse() to be called on every single render, so we use initialiser funciton of useState
  // So evrytime we increment(everytime the countt changes) its setting the count in the localStorage and everytime we reset/refresh its reading from the local storage
  useEffect(() => {
    localStorage.setItem('countt', JSON.stringify(countt));
  }, [countt])


  // ***************************************************************************************************
  //            useRef Hook
  // ***************************************************************************************************

  // Use case - for storing a reference to a component say input field or div and then being able to reference that node in your application
  // so we will make a button and whenever we click that button it will focus the input field. So we will get reference to them

  const inputRef = useRef(); // create a new variable and use useRef() here
  // we can pass this to what ever component we want to get reference of (first email input here)
  // So we want a reference to the input field now, so we pass it to the input field. So we console.log(inputRef.current) and we have refernce to the input DOM node and we can do what ever we want. Like call any methods on there or read the values of the stuff
  // we say inputRef.current.focus()

  //--------------------------------------------------------------
  // Usecase - Store number of times a component has rendered
  // useRef() can be used with anything you want to store the reference for. It doesnt have to be necessarily a DOM node. It can be an integer also
  // Lets create another component 
  
  const [showHi, setShowHi] = useState(true);
  //--------------------------------------------------------------
  // Another usecase is with useFetch. So its helpful to know whether a component has unmounted, so we can prevent an error when we are trying setting state on our component that has been unmounted.
  // we create another component ApiCall.js

  const [showApiCall, setShowApiCall] = useState(true);

  // If we increment the counter, the apicall takes some time to return (because of setTimeout), If we toggle the component off at this time, its gonna try to update the state when the component is gone and we get this error
  /*
  Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    at ApiCall (http://localhost:3000/static/js/main.chunk.js:43:85)
  */
  // We try caling setState() when the component is gone
  // So we can use reference ot help solve this problem. In useFetch.js hook

  // So now if we increment and we toggle the component off, when the data loads its not longer going to cal setState because the current value is false.

  //-------------------------------------------------
  // lets use useRef() with functions
  const hello = useRef(() => {
      console.log('hello')
  })
  // lets put this hello reference on the focus button we made earlier.
  // So now when we click focus button, it focuses the email input and logs 'hello' to the console.

  return (
    <div className="App">
      <h2 style={{color: "red"}}>useState</h2>
      <p>Count: {count}</p>
      {/* Calling setCount on buttonclick */}
      <button onClick={() => setCount(count+1)}>Count +</button>

      {/* Similar to setState() we can pass in a function to setCount() */}
      {/* So insted of incrementing the count like above, we can pass an updater function */}
      {/* It takes a single parameter (this is what the current state is, in this case count. We can also name it currentCount). And we return the new state from this updater function */}
      {/* This is a great way to handle asynchronous state updates */}
      <button onClick={() => setCount(currentCount => currentCount - 1)}>Count -</button>

      {/* -------------------------------------------------------------------- */}
      <hr/>
      <p>Number1: {number1}</p>
      <p>Number2: {number2}</p>
      {/* the updator function onClick now needs to be fixed. The state is now an object */}
      {/* spread the current state (to retain other parts of the state) and then make changes to parts of the state */}
      <button onClick={() => setNumber(currentState => ({...currentState, number1: currentState.number1 + 1}))}>Number +</button>
      <br/>
      <p></p>
      <button onClick={() => setNumber(currentState => ({...currentState, number1: currentState.number1 + 1, number2: currentState.number2 + 5}))}>Both Number +</button>

      {/* ----------------------------------------------------------------------*/}

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
      {/* ------------------------------- Forms ------------------------------ */}
      {/* useRef() used here in the input */}
      <input ref={inputRef} type="email" placeholder="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
      <br/>
      <hr/>

      <h2 style={{color: "red"}}>useState: useForm</h2>
      <input type="email" placeholder="email" name="email" value={values.email} onChange={handleChange} />
      <input type="password" placeholder="password" name="password" value={values.password} onChange={handleChange} />
      <input type="text" placeholder="first name" name="first name" value={values.firstName} onChange={handleChange} />

      {/* We can generate a custom hook for the form elements here
        - In useForm.js */}
  {/* ************************************************************************************** */}
                      {/* useEffect */}
  {/* ************************************************************************************** */}
      <br/><hr/>
      <h2 style={{color: "green"}}>useEffect</h2>
      {/* conditionally render Hello component */}
      {showHello && <Hello />}
      {/* button to toggle it on and off */}
      <button onClick={() => setShowHello(!showHello)}>toggle</button>
      {/* you toggle it, it disappears and the upmount in the console. Then is appears and mount in the console */}

      <br/><hr/>

      {/* -----useFetch------------ */}
      <h2 style={{color: "green"}}>useEffect: useFetch</h2>

      <div>{loading1 ? "loading..." : data1}</div>

      <hr/>

      {/* <div>{loadingg ? 'loading...' : dataa}</div> */}
      <div>{!dataa ? 'loading...' : dataa}</div>
      <div>count: {countt}</div>
      <button onClick={() => setCountt(c => c + 1)}>Increment</button>

  {/* **************************************************************************************** */}
                      {/* useRef */}
  {/* ************************************************************************************** */}
  
      <br/><hr/>
    <h2 style={{color: "blue"}}>useRef</h2>

      <button onClick={() => {
        console.log(inputRef.current);
        inputRef.current.focus();
        hello.current();
      }}>Focus</button>

      {/* conditionally render Hi component */}
      {showHi && <Hi />}
      {/* button to toggle it on and off */}
      <button onClick={() => setShowHi(!showHi)}>toggle</button>
      <hr/>

      <div style={{color:"blue"}}>ApiCall output</div>
      {showApiCall && <ApiCall />}
      <button onClick={() => setShowApiCall(!showApiCall)}>Toggle ApiCall</button>

    </div>
  );
}

export default App;
