import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';



function App() {
  const dataURI = 'https://infinite-fortress-15465.herokuapp.com/count';
  const [count, setCount] = useState(null);

  const handleCount = (url, method) => fetch(url, { method })
                                            .then(response => response.json())
                                            .then(data => setCount(data.currentCount))
                                            .catch(err => console.log(err.message));
    
  const handleClick = countType => {
    switch(countType) {
      case 'inc':
        handleCount(`${dataURI}/${count + 1}`, 'POST');
        break;
      case 'dec':
        handleCount(`${dataURI}/${count - 1}`, 'POST');
        break;
      case 'reset':
        handleCount(`${dataURI}/0`, 'POST');
        break;
      default:
        break;
    }
  }

  useEffect(() => handleCount(dataURI, 'GET'), [count]);
  
  return (
    <div className="App" style={{marginTop: 50}}>
      <h1 style={{height: 50}}>{count}</h1>
      <button style={{marginRight: 10}} onClick={() => handleClick('dec')}>-</button>
      <button style={{marginRight: 10}} onClick={() => handleClick('inc')}>+</button>
      <button onClick={() => handleClick('reset')}>Reset</button>
    </div>
  );
}


export default App;
