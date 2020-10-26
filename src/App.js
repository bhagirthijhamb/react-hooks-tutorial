import React, { useEffect, useState } from 'react';
import './App.css';
import { useForm } from "./useForm";
import { Hello } from './Hello';
import { useFetch, useFetch1, useFetchh } from './useFetch';

function expensiveInititalState(){
  // for loop etc
  // console.log('run function'); // is logged only the very first time the component is rendered, not on every subsequent rerenders( on clicks)
  return 10;
}

function App() {
  // Do not call Hooks inside loops, conditions or nested functions
  // ***************************************************************************************************
  //            useState Hook
  // ***************************************************************************************************

  // useState() is used to define state. It can have as its first parameter the initial value/default state that it is gonna store. 
  // eg. useState(10)

  // In class components, we set the state inside of the constructor, so the value of initial state will only ever be run once. 
  // But inside of function component the value inside useState() gets called everytime we run our function. (the App function)
  // So if it was some realy complex computation inside useState(), if that would happen over and over again every time we rendered our component, it could really slow down the performance of our application.
  // That is why useState() has two ways to pass in the state
  // First way is just the hard coded value like useState(10) and its gonna run everytime.
  // Second way is it also takes the function version. What this does is it runs the function only the very first time your component renders

  // const [count, setCount] = useState(expensiveInititalState())
  // will run everytime
  // const [count, setCount] = useState(() => expensiveInititalState())
  // will run only once

  // or we can have a function that returns the initial value - useState(() => 10). We would want to do this if we have a computation that is very expensive.

  // This way it is called only first time, not every single time the component renders.
  // Only have this run on the initial value
  useState(() => expensiveInititalState());

  // useState() always returns an array with 2 values. // const arr = useState(). But nobody write it like this, instead destructures the array like this.
  // First value is the current state (count)
  // Second value is the function that is used to update the current state.
  const [count, setCount] = useState(10);
  // we render the count and we have buttons that increment and decrement the count

  // const incrementCount = () => {
  //   setCount(count + 1);
  // }

  // if we want to increase the value by 2 on a click
  // The code below will increase the count by 1 only. Because the value of count here is the value of count when we render our function
  // So we are calling setCount() of 10-1 two times. They are essentially overwriting each other.
  // const incrementCount = () => {
  //   setCount(count + 1);
  //   setCount(count + 1);
  // }

  //  this can be solved by using updater function inside setCount()
  
  // const incrementCount = () => {
  //   setCount(peviousCount => previousCount + 1);
  //   setCount(peviousCount => previousCount + 1);
  // }

  // This is actually incorrect way to update value based on previous value. As in class components there is a second version of setState() where we can pass a function to setState().
  // Same way we can pass a function to setCount() and this function takes previous state value and returns the updated state value 

  const incrementCount = () => {
    setCount(previousCount => previousCount + 1);
  }

  // ---------------------------------------------------

  // we can store anything in useState(). Here we are storing an object. And then we are destructuring that object and grabbing the numbers (number1 and number2)
  // Lets say we want to increment the number here but we only want to increment the number2

  // const [state, setState] = useState({number1: 10, number2: 20, theme: 'blue'})
  // const number1 = state.number1;
  // const number2 = state.number2;
  // const theme = state.theme;

  const [{number1, number2, theme}, setNumber] = useState({number1: 3, number2: 4, theme: 'blue'})

  // If we are using object inside of useState() as our state. For updating a part of this state, like for incrementing say number1 and keeping the other values unchanges, we have to return the state after spreading it and then updating the values we want to change.
  // The reason the automatic merging does not happen it because in general when you are using a state inside of a hook like this, what we are going to do is actually have multiple state hooks like below
  // ----------------------------------------------------

  const [num1, setNum1] = useState(8);
  const [num2, setNum2] = useState(9);
  const [themee, setThemee] = useState('blue');

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

  // Main use of useEffect hook - Every time a component is rendered or it rerenders, the callback function inside the useEffect hook is called.
    useEffect(() => {
      // console.log('render')
      // when we type in the input box, the component rerenders with each word typed and we see 'render' printed in the console.
    })
  // Everything else we do after this is for the callback function to be called less and to clean up after the render has happened.
  // If we want the function to be called less and. eg we dont want the function to be called on every render but only when we change the password.
  // We can do this by passing another argument to the useEffect as an array
  // the second parameter is caled dependency array that we can pass in. Here we can pass in all the values that our useEffect depends on. These values when they change, the callback function fires off again.
  useEffect(() => {
    // console.log('Second render')
    // when we type in the password input box, the component rerenders and we see 'render' printed in the console.
  }, [values.password])
  
  // We can put more than one value here. eg if we have another field firstname.
  useEffect(() => {
    // console.log('Third render');
  }, [values.email, values.password]);

  // SO now my useEffect depends on email and password but not the firstname
  // This does a shallow comparison of the values, whenever the values change the function is called.
  // Shallow comparison means if we put an object [values] the object is going to change on every single change or a new object is going to be created so the function is gona be called every single time.

  //---------------------------------------------------------------
  // We can replace componentDidMount and componentWillUnmount with useEffect hook
    useEffect(() => {
      // console.log('print once')
      // Will log just once during first render of component when it mounts, that it. Doing renrenders in not gonna call the function there (try typing in the input boxes, it will not type in the console.)
    }, []) 

    // we can do a cleanup function which means we can return that function from the inside of the function inside of useEffect(). The returned function is called the cleanup function and we can add the cleanup logic here.
    useEffect(() => {
      // console.log('print once')
      
      return () => {
        // console.log('unmount')
        // we see this when the component disappears(for a fraction of a second)
      }
    }, [])

    // We can create another component Hello.js. Here if we toogle it, if we show it and then dont show it,it will mount and unmount each time
    // by default we will show it
    const [showHello, setShowHello] = useState(true);
    // So we can see the component mounting and unmounting here

    //-----------------------------------------------------------------------
    // the cool thing is that it doesnt have to be when the component mounts and unmounts

    // lets say we want to fire off when the value of email input changes
    // So whenever the value in the email input chnages, its gonna call the cleanup function.
    // So when we type a letter in the email input, we see unmount, we are not unmounting we are just cleaning up the old value and we have a new value(letter) here.
    // First we see 'unmount...' and then 'mount...' because first it cleans up the old value and then we have 'mount...' for new value. (its not mounting or unmounting here. we can do this whenever the dependencies change)
    useEffect(() => {
      // console.log('mount from email...')
      
      return () => {
        // console.log('unmount from email...')
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

    // We can have more than one useEffect in a component and they fire off in order
    // Every time the useEffect hook runs, whatever is in the return gets run first to clean up whatever we did last time. So if you set up an event listener in useEffect() you wanna make sure your clean up code removes that so you dont constantly readd your event listener.
    // If you subscribe to some API in useEffect, return should clean that up and unsubscribe from that API.
    // Also this return gets called anytime your component unmounts

  //---------------------------------------------------------------------------
  // Fetch from an API
  // create a custom hook useFetch.js hook

  // call useFetch hook now, it logs the fact about number 43 to the console.
  useFetch('http://numbersapi.com/43/trivia');
  
  // lets make this more useful. i want this to return to me the data and loading (true/false whether the data is loading or not (whether there is anything in the data))
  // How do we do this? 
  // We can combine the useFetch hook with useState hook to store some information (go to useFetch.js)
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

  //--------------------------------------------------------------------------
  // useEffect Hooks

  // Depending on what resouce type we have selected (posts, comments, users), we want to query the JSONplaceholder API
  // We want to set our code to react to when we change our resource type. We essentially want a side effect to happen when our resource type changes.
  // In class components , we use the lifecycle methods for mounting and updating to create these different type of side effects.
  // In function components we use useEffect to say we want to do some form of side affect when something happens.
  const [resourceType, setResourceType] = useState('users');

  // code inside useEffect gets executed everytime the application renders and rerenders(click of buttons)
    // useEffect(() => {
    //   console.log('resource render from useEffect');// printed out every time
    // })

  // This is kind of useful for doing certain kind of things everytime you render but more often than not you are gonna only want to do things when maybe your compoentnt mounts or when a specific resource on your page changes.
  // to do that the second paramter to useEffect, an array. Whatever you pass to this array is going to be values that whenever they change your hook is going to run
  // console.log('render from resourse type compoenent')
  useEffect(() => {
      // console.log('resource type changed');// printed out every time
  }, [resourceType])

  // So we can create something unique and createn a hook that only ever runs on mount by just passing an empty array.
  // No matter what we do on our page, we will not get 'on mount' printed on console again. because the empty array never actualy changes between different renders.
  useEffect(() => {
    // console.log('on mount');
  }, [])

  // So in our case we want to query the api when resource type chnages
  // lets set the value that we recieve to some form of state (an empty array by default).
  // Then we print that out. Click users, comments, posts to print different things. SO we modify our code and set new state based on the changes by just using the simple useEffect
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then((response) => response.json())
      // .then((json) => console.log(json))
      .then((json) => setItems(json))
    }, [resourceType])

  //--------------------------------------

  // modify a variable based on the width of the window that we have open
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // prints the current window width 
  // resize the window width, the printed value does not change but when we refresh the browser it updates
  // so we want to listen to the window resize event and modify this innerWidth variable.
  // in class based components we would add event listener on mount and remove it on unmount.

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  // the value updates because as soon as the component mounts it adds the event listener and we can dynamically update this value.
  // we need to remove the event listener. we can do this clean up by returning a function and this function is called whenever this useEffect is cleaned up

  
  return (
    <div className="App">
      <h2 style={{color: "red"}}>useState</h2>
      <p>Count: {count}</p>
      {/* Calling setCount on buttonclick */}
      {/* <button onClick={() => setCount(count+1)}>Count +</button> */}
      <button onClick={incrementCount}>Count +</button>

      {/* Similar to setState() we can pass in a function to setCount() */}
      {/* So insted of incrementing the count like above, we can pass an updater function */}
      {/* It takes a single parameter (this is what the current state is, in this case count. We can also name it currentCount). And we return the new state from this updater function */}
      {/* This is a great way to handle asynchronous state updates */}
      <button onClick={() => setCount(currentCount => currentCount - 1)}>Count -</button>

      {/* -------------------------------------------------------------------- */}
      <hr/>
      <p>Number1: <span>{number1}</span><span>{theme}</span></p>
      <p>Number2: {number2}</p>
      {/* the updator function onClick now needs to be fixed. The state is now an object */}
      {/* spread the current state (to retain other parts of the state) and then make changes to parts of the state */}

      {/* <button onClick={() => setNumber(currentState => ({...currentState, number1: currentState.number1 + 1}))}>Number1 +</button> */}
      <button onClick={() => setNumber(currentState => { return {...currentState, number1: currentState.number1 + 1}})}>Number1 +</button>
      <br/>
      <p></p>
      <button onClick={() => setNumber(currentState => ({...currentState, number1: currentState.number1 + 1, number2: currentState.number2 + 5}))}>Both Number +</button>

      {/* ----------------------------------------------------------------------*/}

      <hr/>
      <p>Num1: <span>{num1}</span><span>{themee}</span></p>
      <p>Num2: {num2}</p>
      {/* Below will change just num1, won't change num2 */}
      <button onClick={() => setNum1(n => n+1)}>Num1 +</button> 
      <br/>
      <p></p>
      {/* To increment both of them */}
      <button onClick={() => {
        setNum1(n => n+1);
        setNum2(n => n+2);
        setThemee('red')
      }}
      >Both Nums +</button> 
      <br/>
      <hr/>
      {/* ------------------------------- Forms ------------------------------ */}
      <h2>useState: form</h2>
      {/* useRef() used here in the input */}
      <input type="email" placeholder="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
      <br/>
      <hr/>

      <h2 style={{color: "red"}}>useState: useForm Hook</h2>
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

        {/* For jitter change this to that */}
      {/* <div>{loadingg ? 'loading...' : dataa}</div> */}
      <div>{!dataa ? 'loading...' : dataa}</div>
      <div>count: {countt}</div>
      <button onClick={() => setCountt(c => c + 1)}>Increment</button>
  <hr/>
  {/* ------------------------------------------------------------------------ */}
      <h2 style={{color: "green"}}>useEffect</h2>

        <button onClick={() => setResourceType('posts')}>Posts</button>
        <button onClick={() => setResourceType('users')}>Users</button>
        <button onClick={() => setResourceType('comments')}>Comments</button>
      <h3>{resourceType}</h3>
        {items.map(item => {
          return <pre>{JSON.stringify(item)}</pre>
        })}

  <hr/>
  {/* ------------------------------------------------------------------------ */}
      <h2 style={{color: "green"}}>useEffect</h2>
      <div>{windowWidth}</div>

  
    </div>
  );
}

export default App;
