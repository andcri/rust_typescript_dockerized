import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';

export default function App () {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get('/api')
      .then(res => {
        console.log(res)
        setData(res.data);
    }).catch((err) => {console.log(err)})
  }, []);

  function makeRequest () {
    axios.post('/api/post', {
      username: "65 this is a test"
    })
    .then(res => {
      setData(res.data)
    })
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick = {() => setCount(count + 1)}>
        Clicked
      </button>
      <button onClick = {() => makeRequest()}>
        Click MEEEEEE
      </button>
      <p>here test: {data}</p>
    </div>
  );
}