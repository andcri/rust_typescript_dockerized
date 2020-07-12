import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './assets/main.css'

export default function App () {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(0);

  useEffect(() => {
    axios.get('/api')
      .then(res => {
        console.log(res)
        setData(0);
    }).catch((err) => {console.log(err)})
  }, []);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick = {() => setCount(count + 1)}>
        Clicked
      </button>
      <p>here test: {data}</p>

     <div className="font-bold text-purple-500 text-xl mb-2">
          Test
        </div>
    </div>
  );
}