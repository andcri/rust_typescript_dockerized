import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import {Button, Toast} from 'react-bootstrap';

export default function App () {
  const [data, setData] = useState(0);
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get('/api')
      .then(res => {
        console.log(res)
        setData(0);
        console.log(data)
    }).catch((err) => {console.log(err)})
  }, []);

  function sendRequest () {
    axios.post('/api/post', {
      'username': text
    }).then(res => {
      setResult(res.data) 
    })

  }

  function copied () {
    navigator.clipboard.writeText(result)
    setShow(true)
  }

  return (
    <div>
      <div className="container">
        <div className="row">
        <div className="col-sm"/>
        <div className="col-sm">
          <h1>Sluggifier</h1>
          <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide={true}>
            <Toast.Header>
              <strong className="mr-auto">Success!</strong>
            </Toast.Header>
            <Toast.Body>Copied {result} to clipboard</Toast.Body>
          </Toast>
          <p/>
        </div>
        <div className="col-sm"/>
        </div>
      </div>
      <div className="container">
      <div className="row">
          <div className="col-sm"/>
          <div className="col-sm">
            <div className="input-group mb-3">
              <input type="text" className="form-control" onChange={e => setText(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
              <input type="text" className="form-control" value={result} readOnly={true}/>
            </div>
            <Button onClick={sendRequest}>Slugify</Button>{' '}
            <Button variant="danger" onClick={() => setResult('')}>Reset</Button>{' '}
            <Button variant="warning" onClick={copied}>Copy</Button>
          </div>
        </div>
      </div>
    </div>
  );
}